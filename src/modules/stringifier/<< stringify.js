module.exports = ({ self, config }) => (obj, opts = {}) => {

    const stringify = key => {
        const val = _.get(obj, key);
        if (self.isEmpty(val)) return [];
        const str = self.stringifyValue(val);
        return [key, str].join(config.keyValueSeparator);
    };

    return opts.pick.flatMap(stringify).join(' ');

};

