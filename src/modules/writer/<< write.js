const flat = require('flat');

module.exports = ({ util, config }) => (obj, opts = {}) => {

    const keys = opts.pick.length ? opts.pick : Object.keys(flat(obj, { safe: true }));

    return keys
        .filter(k => _.has(obj, k))
        .flatMap(k => {
            const val = _.get(obj, k);

            if (util.isEmpty(val)) return [];

            const processArray = () => {
                return val.flatMap(val => {
                    if (util.isEmpty(val)) return [];
                    const str = val.toString().replace('/', '_').trim();
                    const shouldQuote = val === 'true' || val === 'false';
                    return shouldQuote ? `"${str}"` : str;
                });
            };

            const processValue = () => {
                const str = val.toString().replace('/', '_').trim();
                const shouldQuote = str.includes(' ') || val === 'true' || val === 'false';
                return shouldQuote ? `"${str}"` : str;
            };



            const processed = Array.isArray(val) ? processArray() : processValue();
            if (util.isEmpty(processed)) return [];

            const res = Array.isArray(processed) ? [k, '[' + processed.join(',') + ']'].join(config.keyValueSeparator) : [k, processed].join(config.keyValueSeparator);

            return res;


        }).join(' ');
};

