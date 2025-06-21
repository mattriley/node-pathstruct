module.exports = ({ self, config }) => (obj, options = {}) => {

    const { valid, errors } = self.validate({ obj, options });
    if (!valid) throw errors;

    const defaultOptions = { ...config, pick: Object.keys(obj) };
    const opts = { ...defaultOptions, ...options };

    // Native pick equivalent
    const target = {};
    for (const key of opts.pick) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            target[key] = obj[key];
        }
    }

    const flatObj = $.obj.flatten(target, { delimiter: '.' });

    const stringify = ([key, val]) => {
        if (self.isEmpty(val)) return [];
        const str = self.stringifyValue(val, opts);
        return [key, str].join(config.keyValueSeparator);
    };

    return Object.entries(flatObj)
        .flatMap(stringify)
        .join(opts.keyValueDelimiter);

};
