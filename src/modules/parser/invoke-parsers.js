module.exports = ({ config }) => str => {

    if (!str.includes(config.keyValueSeparator)) return {}; // Minor optimisation

    const match = str => [...str.matchAll(/(?<keypath>\S+)=(?<val>[^\]]*\]|"[^"]*"|\S*)/g)];
    const removeSurroundingSquareBrackets = str => str.replace(/^\[(.*)\]$/, '$1');

    const all = str.split(config.pathSeparator).flatMap(seg => {


        const matches = match(seg).map(result => {
            const { keypath, val } = result.groups;
            const arr = val.startsWith('[') ? removeSurroundingSquareBrackets(val).split(config.arrayDelimiter).map(el => el.trim()) : undefined;
            const override = keypath.includes(config.overrideDelimiter);
            const newKeypath = keypath.replace(config.overrideDelimiter, '.');
            const partial = _.set({}, newKeypath, arr ?? val);
            return { keypath: newKeypath, val: arr ?? val, override, partial };
        });


        return matches;


    });


    const [overrides, standards] = _.partition(all, obj => obj.override);

    const o = _.merge({}, ...standards.map(s => s.partial), ...overrides.map(o => o.partial));

    return o;


};
