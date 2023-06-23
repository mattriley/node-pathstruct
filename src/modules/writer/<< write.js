const flat = require('flat');

module.exports = ({ config }) => (obj, opts = {}) => {

    const pick = opts.pick.length ? opts.pick : Object.keys(flat(obj, { safe: true }));

    return pick
        .filter(k => _.has(obj, k))
        .filter(k => !(_.isObject(_.get(obj, k)) && _.isEmpty(_.get(obj, k)))) // remove empty objects as can happen when "deleting" values in keyval provider...
        .flatMap(k => {
            let val = _.get(obj, k);
            if (!val) return []; // i think??



            if (Array.isArray(val)) {
                const newVals = val.flatMap(val => {
                    if (!val) return [];
                    // if (val === true || val === false) return val;
                    val = val.toString();
                    val = val.trim();
                    if (!val) return [];
                    // if (val.includes(' ')) val = `"${val}"`;
                    return val.replace('/', '_');
                });

                if (newVals.length === 0) return [];

                return [k, '[' + newVals.join(',') + ']'].join(config.keyValueSeparator);
            }

            if (!val) return [];

            // if (val === true || val === false) return [k, val].join(config.keyValueSeparator);

            val = val.toString();

            val = val.trim();
            if (!val) return [];
            if (val?.includes(' ')) val = `"${val}"`;
            return [k, val?.replace('/', '_')].join(config.keyValueSeparator);


        }).join(' ');
};

