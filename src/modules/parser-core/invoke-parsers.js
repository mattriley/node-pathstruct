module.exports = ({ parsers, config }) => str => {

    // This is a slight optimisation
    if (!str.includes(config.keyValueSeparator)) return {};

    return str.split(config.pathSeparator).reduce((acc, seg) => {
        const obj = Object.values(parsers).flatMap(p => p(seg));
        return _.merge(acc, ...obj);
    }, {});

};
