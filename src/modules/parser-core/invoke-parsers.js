module.exports = ({ parsers, config }) => str => {

    // This is a slight optimisation
    const parserFuncs = str.includes(config.keyValueSeparator) ? Object.values(parsers) : [];

    const arr = str.split(config.pathSeparator);
    const entries = arr.filter(Boolean).map(seg => {
        const results = parserFuncs.flatMap(p => p(seg));
        return _.merge({}, ...results);
    });

    return _.merge({}, ...entries);

};
