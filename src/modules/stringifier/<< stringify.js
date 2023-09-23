const { o } = require('1up');

module.exports = ({ self, config }) => (obj, options = {}) => {

    const { valid, errors } = self.validate({ obj, options });
    if (!valid) throw (errors);

    const defaultOptions = { pick: Object.keys(obj) };
    const opts = { ...defaultOptions, ...options };

    const target = _.pick(obj, opts.pick);
    const flatObj = o.flatten(target, { delimiter: '.' });

    console.warn(flatObj);

    const stringify = ([key, val]) => {
        const str = self.stringifyValue(val);
        if (self.isEmpty(val)) return [];
        return [key, str].join(config.keyValueSeparator);
    };

    return Object.entries(flatObj).flatMap(stringify).join(' ');

};
