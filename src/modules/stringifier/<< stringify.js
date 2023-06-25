const flat = require('flat');

module.exports = ({ self, config }) => (obj, options = {}) => {

    const defaultOptions = { pick: Object.keys(obj) };
    const opts = { ...defaultOptions, ...options };

    const target = _.pick(obj, opts.pick);
    const flatObj = flat(target, { safe: true });

    const stringify = ([key, val]) => {
        if (self.isEmpty(val)) return [];
        const str = self.stringifyValue(val);
        return [key, str].join(config.keyValueSeparator);
    };

    return Object.entries(flatObj).flatMap(stringify).join(' ');

};
