const flat = require('flat');

module.exports = ({ self, config }) => (obj, options = {}) => {

    const defaultOptions = { pick: Object.keys(obj) };
    const opts = { ...defaultOptions, ...options };

    const { valid, errors } = self.validate({ obj, options: opts });
    if (!valid) throw (errors);

    const target = _.pick(obj, opts.pick);
    const flatObj = flat(target, { safe: true });

    const stringify = ([key, val]) => {
        const str = self.stringifyValue(val);
        if (self.isEmpty(val)) return [];
        return [key, str].join(config.keyValueSeparator);
    };

    return Object.entries(flatObj).flatMap(stringify).join(' ');

};
