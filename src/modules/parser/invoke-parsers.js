module.exports = ({ self, config }) => str => {

    if (!str.includes(config.keyValueSeparator)) return {}; // Minor optimisation

    const parsers = [self.parseObject, self.parseArray];

    const objs = str.split(config.pathSeparator).flatMap(seg => {
        return parsers.flatMap(p => p(seg));
    });

    const standards = objs.flatMap(obj => obj.standard ?? []);
    const overrides = objs.flatMap(obj => obj.override ?? []);

    // console.warn({ standards, overrides });

    return _.merge({}, ...standards, ...overrides);


};
