module.exports = ({ $ }) => (str, options) => {
    const result = {};

    // ── helpers ────────────────────────────────────────────────────────────────
    function parseArray(val) {
        // early check avoids creating substrings when not an array-literal
        if (val.length < 2 || val.charCodeAt(0) !== 91 || val.charCodeAt(val.length - 1) !== 93) { // '[' = 91, ']' = 93
            return null;
        }
        const inner = val.slice(1, -1).trim();
        if (!inner) return [];
        return inner.split(options.arrayDelimiter).map(s => s.trim());
    }

    // Ensure parent object for a dot path and return { parent, key }
    function ensureParent(obj, path) {
        const parts = path.split('.');
        const lastIdx = parts.length - 1;
        let cur = obj;
        for (let i = 0; i < lastIdx; i++) {
            const k = parts[i];
            const v = cur[k];
            if (v == null || typeof v !== 'object' || Array.isArray(v)) {
                cur[k] = {};
            }
            cur = cur[k];
        }
        return { parent: cur, key: parts[lastIdx] };
    }

    // First value stays string; second promotes to array; then push.
    function pushPromote(obj, path, value) {
        const { parent, key } = ensureParent(obj, path);
        const existing = parent[key];
        if (existing === undefined) {
            parent[key] = value; // first → string
        } else if (Array.isArray(existing)) {
            existing.push(value); // already array
        } else {
            parent[key] = [existing, value]; // promote
        }
    }

    // Build a single regex: (?:^|\s)(@|#|\$|...)(\w+)
    const markerEntries = Object.entries(options.markers || {});
    let markerRx = null;
    if (markerEntries.length > 0) {
        const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Sort prefixes by length desc so multi-char prefixes match correctly
        const alternation = markerEntries
            .map(([p]) => esc(p))
            .sort((a, b) => b.length - a.length)
            .join('|');
        markerRx = new RegExp('(?:^|\\s)(' + alternation + ')(\\w+)', 'g');
    }

    const segments = str.split(options.pathSeparator);
    const overrides = [];
    const normal = [];

    for (const seg of segments) {
        // 1) markers: scan once per segment, push to mapped paths
        if (markerRx) {
            markerRx.lastIndex = 0; // explicit reset for safety
            for (const m of seg.matchAll(markerRx)) {
                const prefix = m[1];      // matched prefix (e.g., '@')
                const word = m[2];      // captured word (e.g., 'foo')
                const target = options.markers[prefix];
                if (target) {
                    pushPromote(result, target, word);
                }
            }
        }

        // 2) key=value pairs
        for (const match of seg.matchAll(options.keyValueExpression)) {
            const g = match.groups || {};
            const key = g.key;
            const val = g.val;
            const isOverride = key.indexOf(options.overrideDelimiter) !== -1;
            const path = key.replace(options.overrideDelimiter, '.');
            const parsedVal = parseArray(val) || val;
            (isOverride ? overrides : normal).push([path, parsedVal]);
        }
    }

    // 3) apply normals then overrides (overrides win)
    for (const [path, val] of normal) { $.obj.set(result, path, val); }
    for (const [path, val] of overrides) { $.obj.set(result, path, val); }

    return result;
};
