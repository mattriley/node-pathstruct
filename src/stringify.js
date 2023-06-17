const _ = require('lodash');
const flat = require('flat');

const tags = ['edit'];

const separator = '=';
const delimiter = ' ';


module.exports = ({ lib }) => {

    const applyFile = (f, { config }) => {

        const { key, keys = [] } = config;
        if (key) keys.push(key);

        // for now only take last field in path, e.g. moment.event = event

        return keys
            .filter(k => _.has(f.metadata, k))
            .filter(k => !(_.isObject(lib.mget(f.metadata, k)) && _.isEmpty(lib.mget(f.metadata, k)))) // remove empty objects as can happen when "deleting" values in keyval provider...
            .flatMap(k => {
                let val = lib.mget(f.metadata, k);
                if (!val) return []; // i think??

                if (Array.isArray(val)) {
                    const newVals = val.map(val => {
                        // if (val.includes(' ')) val = `"${val}"`;
                        return val.replace('/', '_');
                    });

                    return [k, '[' + newVals.join(',') + ']'].join(separator);
                }


                if (_.isObject(val)) {
                    const flatObj = flat({ [k]: val }, { safe: true }); // [k];

                    return Object.entries(flatObj).map(([k, val]) => {
                        if (Array.isArray(val)) {
                            const newVals = val.map(val => {
                                // if (val.includes(' ')) val = `"${val}"`;
                                return val.replace('/', '_');
                            });

                            return [k, '[' + newVals.join(',') + ']'].join(separator);
                        }

                        if (_.isString(val)) {
                            if (val.includes(' ')) val = `"${val}"`;
                            return [k, val.replace('/', '_')].join(separator);
                        }

                        return [k, val].join(separator);
                    });
                }


                if (val?.includes(' ')) val = `"${val}"`;
                return [k, val?.replace('/', '_')].join(separator);
                // return [_.last(k.split('.')), val].join(separator);


            })
            .join(delimiter);
    };


    return { tags, applyFile };
};

