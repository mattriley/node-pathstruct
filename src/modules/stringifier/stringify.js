module.exports = ({ self, config, $ }) => {

    const flat = $.obj.configure.flat({ delimiter: '.', mutate: false });

    return (obj, options = {}) => {

        const defaultOptions = { ...config, pick: Object.keys(obj) };
        const opts = { ...defaultOptions, ...options };
        const target = $.obj.pick(obj, opts.pick);
        const flatObj = flat(target);

        const stringify = ([key, val]) => {
            if (self.isEmpty(val)) return [];
            const str = self.stringifyValue(val, opts);
            return [key, str].join(config.keyValueSeparator);
        };

        return Object.entries(flatObj)
            .flatMap(stringify)
            .join(opts.keyValueDelimiter);

    };
};
