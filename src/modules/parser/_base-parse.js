// Optimised on 21 June 2025 with help from ChatGPT.
// Modified to parse @tag items into result.flags

module.exports = ({ config, $ }) => str => {
    const result = {};

    const parseArray = val =>
        val.startsWith('[')
            ? val.slice(1, -1).split(config.arrayDelimiter).map(s => s.trim())
            : null;

    const segments = str.split(config.pathSeparator);

    const overrides = [];
    const normal = [];

    for (const seg of segments) {
        // 1️⃣ Extract @tags first
        const tagMatches = seg.match(/@\w+/g);
        if (tagMatches) {
            result.f ??= {};
            result.f.flags ??= [];
            for (const tag of tagMatches) {
                result.f.flags.push(tag.slice(1)); // remove @
            }
        }

        // 2️⃣ Extract key=value pairs
        for (const match of seg.matchAll(config.keyValueExpression)) {
            const { key, val } = match.groups;
            const isOverride = key.includes(config.overrideDelimiter);
            const path = key.replace(config.overrideDelimiter, '.');
            const parsedVal = parseArray(val) ?? val;
            const entry = [path, parsedVal];
            (isOverride ? overrides : normal).push(entry);
        }
    }

    // 3️⃣ Apply all normal and override key-values
    for (const [path, val] of [...normal, ...overrides]) {
        $.obj.set(result, path, val);
    }

    return result;
};
