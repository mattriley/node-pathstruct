module.exports = ({ parsers, config }) => str => {

    // This is a slight optimisation
    const parserFuncs = str.includes(config.keyValueSeparator) ? Object.values(parsers) : [];

    const arr = str.split(config.pathSeparator);

    return arr.filter(Boolean).reduce((acc, seg) => {
        const obj = parserFuncs.flatMap(p => p(seg));
        return _.merge(acc, ...obj);
    }, {});

};
