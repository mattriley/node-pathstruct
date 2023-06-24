module.exports = ({ self, config }) => str => {

    // This is a slight optimisation
    if (!str.includes(config.keyValueSeparator)) return {};

    const parsers = [self.parseObject, self.parseArray];

    return str.split(config.pathSeparator).reduce((acc, seg) => {
        const obj = parsers.flatMap(p => p(seg));
        return _.merge(acc, ...obj);
    }, {});

};
