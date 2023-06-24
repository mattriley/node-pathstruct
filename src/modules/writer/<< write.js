const flat = require('flat');

module.exports = ({ util, config }) => (obj, opts = {}) => {

    const keys = opts.pick.length ? opts.pick : Object.keys(flat(obj, { safe: true }));

    return keys.flatMap(key => {
        const val = _.get(obj, key);
        if (util.isEmpty(val)) return [];

        const stringifyArray = val => {
            const csv = val.flatMap(val => stringifyValue(val) ?? []).join(',');
            return `[${csv}]`;
        };

        const stringifyValue = val => {
            if (util.isEmpty(val)) return undefined;
            if (Array.isArray(val)) return stringifyArray(val);
            const str = val.toString().replace('/', '_').trim();
            const shouldQuote = str.includes(' ') || val === 'true' || val === 'false';
            return shouldQuote ? `"${str}"` : str;
        };

        return [key, stringifyValue(val)].join(config.keyValueSeparator);

    }).join(' ');
};

