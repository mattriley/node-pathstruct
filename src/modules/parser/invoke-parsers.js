module.exports = ({ config }) => str => {

    if (!str.includes(config.keyValueSeparator)) return {}; // Minor optimisation

    const parseArray = str => {
        if (!str.startsWith('[')) return;
        return str.slice(1, -1).split(config.arrayDelimiter).map(el => el.trim());
    };

    const matches = str.split(config.pathSeparator).flatMap(seg => {
        return [...seg.matchAll(config.keyValueExpression)].map(result => {
            const { key, val } = result.groups;
            const override = key.includes(config.overrideDelimiter);
            const newKey = key.replace(config.overrideDelimiter, '.');
            const newVal = parseArray(val) ?? val;
            const entry = [newKey, newVal];
            return { override, entry };
        });
    });

    return _.sortBy(matches, match => match.override).reduce((acc, match) => _.set(acc, ...match.entry), {});


};
