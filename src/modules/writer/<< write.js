const flat = require('flat');

module.exports = ({ util, config }) => (obj, opts = {}) => {

    const pick = opts.pick.length ? opts.pick : Object.keys(flat(obj, { safe: true }));

    return pick
        .filter(k => _.has(obj, k))
        .flatMap(k => {
            let val = _.get(obj, k);
            if (util.isEmpty(val)) return []; // i think??



            if (Array.isArray(val)) {
                const newVals = val.flatMap(val => {
                    if (util.isEmpty(val)) return [];
                    const str = val.toString().replace('/', '_').trim();
                    if (!str) return [];
                    // const shouldQuote = str.includes(' ') || typeof val === 'boolean';
                    const shouldQuote = val === 'true' || val === 'false';
                    return shouldQuote ? `"${str}"` : str;
                });

                if (newVals.length === 0) return [];

                return [k, '[' + newVals.join(',') + ']'].join(config.keyValueSeparator);
            }

            if (util.isEmpty(val)) return [];

            // if (val === true || val === false) return [k, val].join(config.keyValueSeparator);

            const str = val.toString().replace('/', '_').trim();
            if (!str) return [];
            const shouldQuote = str.includes(' ') || val === 'true' || val === 'false';
            const res = shouldQuote ? `"${str}"` : str;

            return [k, res].join(config.keyValueSeparator);


        }).join(' ');
};

