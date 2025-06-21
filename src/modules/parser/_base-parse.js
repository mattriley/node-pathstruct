// Optimised on 21 June 2025 with help from ChatGPT.

module.exports = ({ config }) => str => {
    if (!str.includes(config.keyValueSeparator)) return {};

    const result = {};

    const parseArray = val =>
        val.startsWith('[')
            ? val.slice(1, -1).split(config.arrayDelimiter).map(s => s.trim())
            : undefined;

    const segments = str.split(config.pathSeparator);

    const overrides = [];
    const normal = [];

    for (const seg of segments) {
        for (const match of seg.matchAll(config.keyValueExpression)) {
            const { key, val } = match.groups;
            const isOverride = key.includes(config.overrideDelimiter);
            const path = key.replace(config.overrideDelimiter, '.');
            const parsedVal = parseArray(val) ?? val;
            const entry = [path, parsedVal];
            (isOverride ? overrides : normal).push(entry);
        }
    }

    for (const [path, val] of [...normal, ...overrides]) {
        $.obj.putInPlace(result, path, val);
    }

    return result;
};
