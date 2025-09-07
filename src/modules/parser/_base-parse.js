module.exports = ({ $ }) => (str, options) => {

    const result = {};

    function parseArray(val) {
        return val.startsWith('[')
            ? val.slice(1, -1).split(options.arrayDelimiter).map((s) => s.trim())
            : null;
    }

    const segments = str.split(options.pathSeparator);
    const overrides = [];
    const normal = [];

    // Minimal safe getter for dot paths (so we don’t rely on $.obj.get existing)
    function getAtPath(obj, path) {
        const parts = path.split('.');
        let cur = obj;
        for (let i = 0; i < parts.length; i++) {
            if (cur == null || typeof cur !== 'object') return undefined;
            cur = cur[parts[i]];
        }
        return cur;
    }

    // Push a value to an array at dot path; create/convert as needed
    function pushToPath(obj, path, value) {
        const existing = getAtPath(obj, path);
        if (Array.isArray(existing)) {
            existing.push(value);
        } else if (existing === undefined) {
            $.obj.set(obj, path, [value]);
        } else {
            // Coerce non-array to array, preserving existing value
            $.obj.set(obj, path, [existing, value]);
        }
    }

    // cache regex per prefix; require start-of-string OR whitespace before prefix
    const rxCache = new Map();
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    function getRegex(prefix) {
        let rx = rxCache.get(prefix);
        if (!rx) {
            rx = new RegExp('(?:^|\\s)' + esc(prefix) + '(\\w+)', 'g'); // “word” stays \w+
            rxCache.set(prefix, rx);
        }
        return rx;
    }

    for (const seg of segments) {
        // 1) collect marker words into nested arrays
        for (const prefix in options.markers) {
            const pathForValues = options.markers[prefix]; // may contain dots
            const rx = getRegex(prefix);
            const iter = seg.matchAll(rx);
            for (const m of iter) {
                pushToPath(result, pathForValues, m[1]); // append captured word
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

    // 3) apply normals then overrides
    for (const [path, val] of normal) $.obj.set(result, path, val);
    for (const [path, val] of overrides) $.obj.set(result, path, val);

    return result;
};
