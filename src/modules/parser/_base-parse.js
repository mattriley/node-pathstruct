// Optimized, safe (handles frozen regex), and allocation-aware.

const RX_CLONE_CACHE = new WeakMap();
const MARKER_RX_CACHE = new WeakMap();

module.exports = () => (str, options) => {

    const result = {};

    // ── fast locals ───────────────────────────────────────────────────────────
    const markers = options.markers || {};
    const pathSeparator = options.pathSeparator;
    const overrideDelimiter = options.overrideDelimiter;
    const arrayDelimiter = options.arrayDelimiter;
    const valueTerminator = options.valueTerminator; // e.g. ';' (optional)

    // Ensure we have a mutable, global regex even if the original is frozen
    // Also cache clones to avoid re-compilation across calls.
    function toMutableGlobal(re) {
        if (!re) return null;
        const cached = RX_CLONE_CACHE.get(re);
        if (cached) return cached;
        const flags = re.flags.includes('g') ? re.flags : re.flags + 'g';
        const clone = new RegExp(re.source, flags);
        RX_CLONE_CACHE.set(re, clone);
        return clone;
    }

    // Clone the incoming key/value regex so lastIndex is writable
    const keyValueExpression = toMutableGlobal(options.keyValueExpression);

    // ── parse helpers ────────────────────────────────────────────────────────
    function parseArray(val) {
        // '[' ']' guards avoid substring work when not array literal
        if (val.length < 2 || val.charCodeAt(0) !== 91 || val.charCodeAt(val.length - 1) !== 93) {
            return null;
        }
        const inner = val.slice(1, -1).trim();
        if (!inner) return [];
        // Using split on a string (not regex) is fast in V8
        const parts = inner.split(arrayDelimiter);
        for (let i = 0; i < parts.length; i++) {
            const s = parts[i];
            // micro-trim without creating new strings if no outer space
            let start = 0;
            let end = s.length;
            while (start < end && s.charCodeAt(start) <= 32) { start++; }
            while (end > start && s.charCodeAt(end - 1) <= 32) { end--; }
            parts[i] = start === 0 && end === s.length ? s : s.slice(start, end);
        }
        return parts;
    }

    // Per-call parent cache (safe since `result` is fixed per call)
    const parentCache = new Map();
    function ensureParentCached(path) {
        let entry = parentCache.get(path);
        if (entry) return entry;
        const parts = path.split('.');
        const lastIdx = parts.length - 1;
        let cur = result;
        for (let i = 0; i < lastIdx; i++) {
            const k = parts[i];
            const v = cur[k];
            if (v == null) {
                cur[k] = {};
            } else if (typeof v !== 'object' || Array.isArray(v)) {
                // promote scalars/arrays to an object and preserve the original value
                // under the `.value` key so nested assignments like `x.foo=...`
                // become `{ value: <original>, foo: ... }`
                cur[k] = { value: v };
            }
            cur = cur[k];
        }
        entry = { parent: cur, key: parts[lastIdx] };
        parentCache.set(path, entry);
        return entry;
    }

    function pushPromote(path, value) {
        const { parent, key } = ensureParentCached(path);
        const existing = parent[key];
        if (existing === undefined) {
            parent[key] = value; // first → string
        } else if (Array.isArray(existing)) {
            existing.push(value); // already array
        } else {
            parent[key] = [existing, value]; // promote
        }
    }

    function isPlainObject(o) {
        return o !== null && typeof o === 'object' && !Array.isArray(o);
    }

    function fastSet(path, val) {
        const { parent, key } = ensureParentCached(path);
        const cur = parent[key];

        if (cur === undefined) {
            parent[key] = val; // first write
            return;
        }

        // If assigning scalar/array onto an existing object (e.g., after x.foo=... then x=...),
        // keep the object and stash the scalar into `.value` to avoid clobbering nested keys.
        if (isPlainObject(cur) && (typeof val !== 'object' || Array.isArray(val))) {
            cur.value = val; // in-place
            return;
        }

        // Fallback: overwrite (object on scalar, object on object, etc.)
        parent[key] = val;
    }

    // ── marker regex (cached per markers object) ──────────────────────────────
    function escapeRx(s) {
        // faster than replace with function for common ASCII
        return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    let markerRx = MARKER_RX_CACHE.get(markers);
    if (markerRx === undefined) {
        const keys = Object.keys(markers);
        if (keys.length === 0) {
            markerRx = null;
        } else {
            // sort longer first so multi-char prefixes win
            keys.sort((a, b) => b.length - a.length);
            let alternation = '';
            for (let i = 0; i < keys.length; i++) {
                alternation += (i ? '|' : '') + escapeRx(keys[i]);
            }
            markerRx = new RegExp('(?:^|\\s)(' + alternation + ')(\\w+)', 'g'); // mutable, created here
        }
        MARKER_RX_CACHE.set(markers, markerRx);
    }

    // ── semicolon-terminated value rewrite ────────────────────────────────────
    // Converts: key=foo bar;  -> key="foo bar"
    // Also converts: key=bar; -> key=bar   (drops terminator)
    // Leaves existing grammar (append/remove/force, arrays, etc.) to keyValueExpression.
    function skipSpacesForward(s, i, len) {
        while (i < len && s.charCodeAt(i) <= 32) { i++; }
        return i;
    }

    function findNextKeyEquals(seg, from) {
        // Find next " <something>=" boundary. We keep this intentionally permissive
        // because the real grammar lives in keyValueExpression.
        const len = seg.length;
        let i = from;

        while (i < len) {
            // find next space boundary then non-space
            while (i < len && seg.charCodeAt(i) > 32) { i++; }
            i = skipSpacesForward(seg, i, len);
            if (i >= len) return -1;

            // accept any run of non-space as "key-ish" then '='
            const keyStart = i;
            while (i < len && seg.charCodeAt(i) > 32 && seg.charCodeAt(i) !== 61) { i++; }
            if (i > keyStart && i < len && seg.charCodeAt(i) === 61) {
                return keyStart;
            }

            i = keyStart + 1;
        }

        return -1;
    }

    function rewriteTerminatedValues(seg) {
        if (!valueTerminator) return seg;

        const term = valueTerminator;

        // Fast reject
        const firstTerm = seg.indexOf(term);
        if (firstTerm === -1) return seg;

        const len = seg.length;
        let out = null; // lazily allocate
        let last = 0;
        let i = 0;

        while (i < len) {
            const eq = seg.indexOf('=', i);
            if (eq === -1) break;

            // value begins after '=' and optional spaces
            let vStart = skipSpacesForward(seg, eq + 1, len);
            if (vStart >= len) break;

            const first = seg.charCodeAt(vStart);

            // If quoted or array literal, do nothing (existing grammar already supports)
            if (first === 34 || first === 39 || first === 91) { // " ' [
                i = vStart + 1;
                continue;
            }

            // Find a terminator and ensure it belongs to this value (before next key=)
            const termIdx = seg.indexOf(term, vStart);
            if (termIdx === -1) break;

            const nextKeyIdx = findNextKeyEquals(seg, vStart);
            if (nextKeyIdx !== -1 && termIdx > nextKeyIdx) {
                // terminator belongs to some later value, not this one
                i = eq + 1;
                continue;
            }

            // Determine whether the would-be value contains whitespace
            let hasSpace = false;
            for (let k = vStart; k < termIdx; k++) {
                if (seg.charCodeAt(k) <= 32) { hasSpace = true; break; }
            }

            // We are rewriting (at least removing the terminator), so allocate output buffer
            if (!out) out = [];

            if (hasSpace) {
                // Emit everything up to the start of the value
                if (last < vStart) out.push(seg.slice(last, vStart));

                // Emit quoted value, escaping any double quotes inside (rare, but safe)
                // (we keep the inner value as-is, including spaces)
                const rawVal = seg.slice(vStart, termIdx);
                const escaped = rawVal.indexOf('"') === -1 ? rawVal : rawVal.replace(/"/g, '\\"');
                out.push('"', escaped, '"');
            } else {
                // No spaces: keep the original value as-is, just drop the terminator
                if (last < termIdx) out.push(seg.slice(last, termIdx));
            }

            // Skip the terminator (but keep any following whitespace as-is)
            last = termIdx + 1;
            i = last;

            // If the terminator was acting as the delimiter between pairs and there is no whitespace,
            // inject a single space so the downstream regex can still find the next token.
            if (last < len && seg.charCodeAt(last) > 32) {
                out.push(' ');
            }
        }

        if (!out) return seg;

        if (last < len) out.push(seg.slice(last));
        return out.join('');
    }

    // ── main pass ─────────────────────────────────────────────────────────────
    const segments = str.split(pathSeparator);
    const overrides = [];
    const normal = [];

    for (let s = 0; s < segments.length; s++) {
        const seg = segments[s];

        // 1) markers
        if (markerRx) {
            markerRx.lastIndex = 0;
            let m;
            while ((m = markerRx.exec(seg)) !== null) {
                const prefix = m[1];
                const word = m[2];
                const target = markers[prefix];
                if (target) pushPromote(target, word);
            }
        }

        // 2) key=value pairs (use exec loop instead of matchAll)
        if (keyValueExpression) {
            const rewritten = valueTerminator ? rewriteTerminatedValues(seg) : seg;

            keyValueExpression.lastIndex = 0;
            let km;
            while ((km = keyValueExpression.exec(rewritten)) !== null) {
                // rely on named groups; if absent, adjust to indices
                const g = km.groups || {};
                const rawKey = g.key;
                const val = g.val;

                const isOverride = rawKey.indexOf(overrideDelimiter) !== -1;
                const path = isOverride ? rawKey.replace(overrideDelimiter, '.') : rawKey;
                const parsedVal = parseArray(val) || val;

                if (isOverride) {
                    overrides.push([path, parsedVal]);
                } else {
                    normal.push([path, parsedVal]);
                }
            }
        }
    }

    // 3) apply normals then overrides (overrides win)
    for (let i = 0; i < normal.length; i++) {
        const p = normal[i];
        fastSet(p[0], p[1]);
    }
    for (let i = 0; i < overrides.length; i++) {
        const p = overrides[i];
        fastSet(p[0], p[1]);
    }

    return result;
};
