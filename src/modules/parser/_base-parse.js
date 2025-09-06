module.exports = ({ config, $ }) => (str) => {
    const result = {};

    function parseArray(val) {
        return val.startsWith('[')
            ? val.slice(1, -1).split(config.arrayDelimiter).map((s) => s.trim())
            : null;
    }

    const segments = str.split(config.pathSeparator);
    const overrides = [];
    const normal = [];

    // ── markers config: { '@': 'attributes', '#': 'tags', '$': 'flags', ... } ──
    const markers = config && config.markers ? config.markers : {};

    // cache regex per prefix
    const rxCache = new Map();
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    function getRegex(prefix) {
        let rx = rxCache.get(prefix);
        if (!rx) {
            rx = new RegExp('(?:^|\\s)' + esc(prefix) + '(\\w+)', 'g'); // word = \w+
            rxCache.set(prefix, rx);
        }
        return rx;
    }

    for (const seg of segments) {
        // 1) collect marker words
        for (const prefix in markers) {
            const key = markers[prefix];
            const rx = getRegex(prefix);
            const iter = seg.matchAll(rx);
            for (const m of iter) {
                if (!result[key]) result[key] = [];
                result[key].push(m[1]); // captured word
            }
        }

        // 2) key=value pairs
        for (const match of seg.matchAll(config.keyValueExpression)) {
            const g = match.groups || {};
            const key = g.key;
            const val = g.val;
            const isOverride = key.indexOf(config.overrideDelimiter) !== -1;
            const path = key.replace(config.overrideDelimiter, '.');
            const parsedVal = parseArray(val) || val;
            (isOverride ? overrides : normal).push([path, parsedVal]);
        }
    }

    // 3) apply normals then overrides
    for (const [path, val] of normal) $.obj.set(result, path, val);
    for (const [path, val] of overrides) $.obj.set(result, path, val);

    return result;
};
