module.exports = ({ self, config, $ }) => {
    const parseOptions = $.fun.parseConfig(config);
    const flat = $.obj.flat.configure({ delimiter: '.', mutate: false });

    return (obj, options) => {
        options = parseOptions({ pick: Object.keys(obj), ...options });
        let target = $.obj.pick(obj, options.pick);
        target = $.obj.omit(target, options.omit);

        const flatObj = flat(target);

        const stringify = ([key, val]) => {
            if (self.isEmpty(val)) return [];
            const str = self.stringifyValue(val, options);
            return options.keyValueHeader + [key, str].join(config.keyValueSeparator);
        };

        return Object.entries(flatObj).flatMap(stringify).join(options.keyValueDelimiter);
    };
};
