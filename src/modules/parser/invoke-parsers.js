module.exports = ({ config }) => str => {

    if (!str.includes(config.keyValueSeparator)) return {}; // Minor optimisation

    const parseArray = str => {
        if (!str.startsWith('[')) return;
        return str.replace(config.arrayValueExpression, '$<val>').split(config.arrayDelimiter).map(el => el.trim());
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

    const matchesSorted = _.sortBy(matches, match => match.override).map(match => _.set({}, ...match.entry));

    // console.warn(matchesSorted);


    // const [overrides, standards] = _.partition(matches, obj => obj.override);

    // const o = _.merge({}, ...standards.map(s => s.partial), ...overrides.map(o => o.partial));

    const o = _.merge({}, ...matchesSorted);

    return o;


};
