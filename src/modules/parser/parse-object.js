// const matchScalar = str => [...str.matchAll(/(?<keypath>\S+)=(?<val>"[^"]*"|[\w-_+]+)/g)];
const matchScalar = str => [...str.matchAll(/(?<keypath>\S+)=(?<val>"[^"]*"|\S*)/g)];

module.exports = ({ config }) => str => {

    const { standard, override } = matchScalar(str).reduce((acc, m) => {
        const { keypath, val } = m.groups;
        const key = keypath.replace(config.overrideDelimiter, '.');
        const override = keypath.includes(config.overrideDelimiter);
        const target = override ? acc.override : acc.standard;
        _.set(target, key, val);
        return acc;
    }, { standard: {}, override: {} });

    return { ...standard, ...override };

};
