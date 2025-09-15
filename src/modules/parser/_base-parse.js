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

    // Ensure we have a mutable, global regex even if the original is frozen
    // Also cache clones to avoid re-compilation across calls.
    function toMutableGlobal(re) {
        if (!re) {
            return null;
        }
        let cached = RX_CLONE_CACHE.get(re);
        if (cached) {
            return cached;
        }
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
        if (!inner) {
            return [];
        }
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
        if (entry) {
            return entry;
        }
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

    function fastSet(path, val) {
        const { parent, key } = ensureParentCached(path);
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
                if (target) {
                    pushPromote(target, word);
                }
            }
        }

        // 2) key=value pairs (use exec loop instead of matchAll)
        if (keyValueExpression) {
            keyValueExpression.lastIndex = 0;
            let km;
            while ((km = keyValueExpression.exec(seg)) !== null) {
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
