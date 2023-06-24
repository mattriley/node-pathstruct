const flat = require('flat');

module.exports = ({ util, config }) => (obj, opts = {}) => {

    const keys = opts.pick.length ? opts.pick : Object.keys(flat(obj, { safe: true }));

    return keys.flatMap(key => {
        const val = _.get(obj, key);
        if (util.isEmpty(val)) return [];

        const processArray = val => {
            const csv = val.flatMap(val => processValue(val) ?? []).join(',');
            return `[${csv}]`;
        };

        const processValue = val => {
            if (util.isEmpty(val)) return undefined;
            if (Array.isArray(val)) return processArray(val);
            const str = val.toString().replace('/', '_').trim();
            const shouldQuote = str.includes(' ') || val === 'true' || val === 'false';
            return shouldQuote ? `"${str}"` : str;
        };

        return [key, processValue(val)].join(config.keyValueSeparator);

    }).join(' ');
};

