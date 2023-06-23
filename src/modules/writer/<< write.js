const flat = require('flat');

module.exports = ({ config }) => (obj, options = {}) => {

    let { key, keys = [] } = options;
    if (key) keys.push(key);

    if (!keys.length) keys = Object.keys(flat(obj));

    // for now only take last field in path, e.g. moment.event = event

    return keys
        .filter(k => _.has(obj, k))
        .filter(k => !(_.isObject(_.get(obj, k)) && _.isEmpty(_.get(obj, k)))) // remove empty objects as can happen when "deleting" values in keyval provider...
        .flatMap(k => {
            let val = _.get(obj, k);
            if (!val) return []; // i think??

            if (Array.isArray(val)) {
                const newVals = val.map(val => {
                    // if (val.includes(' ')) val = `"${val}"`;
                    return val.replace('/', '_');
                });

                return [k, '[' + newVals.join(',') + ']'].join(config.keyValueSeparator);
            }


            if (_.isObject(val)) {
                const flatObj = flat({ [k]: val }, { safe: true }); // [k];

                return Object.entries(flatObj).map(([k, val]) => {
                    if (Array.isArray(val)) {
                        const newVals = val.map(val => {
                            // if (val.includes(' ')) val = `"${val}"`;
                            return val.replace('/', '_');
                        });

                        return [k, '[' + newVals.join(',') + ']'].join(config.keyValueSeparator);
                    }

                    if (_.isString(val)) {
                        if (val.includes(' ')) val = `"${val}"`;
                        return [k, val.replace('/', '_')].join(config.keyValueSeparator);
                    }

                    return [k, val].join(config.keyValueSeparator);
                });
            }


            if (val?.includes(' ')) val = `"${val}"`;
            return [k, val?.replace('/', '_')].join(config.keyValueSeparator);
            // return [_.last(k.split('.')), val].join(config.keyValueSeparator);


        }).join(' ');
};

