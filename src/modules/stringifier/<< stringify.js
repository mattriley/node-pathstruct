module.exports = ({ self, util, config }) => (obj, opts = {}) => {

    return opts.pick.flatMap(key => {
        const val = _.get(obj, key);
        if (util.isEmpty(val)) return [];
        return [key, self.stringifyValue(val)].join(config.keyValueSeparator);
    }).join(' ');

};

