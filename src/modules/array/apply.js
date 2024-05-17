const _ = require('lodash');

module.exports = ({ array }) => (obj, key, ...aliases) => {

    const keys = array.deriveKeys([key, ...aliases]);
    const setKeys = keys.filter(key => !['+', '-'].find(sym => key.endsWith(sym)));
    const addKeys = keys.filter(key => ['+'].find(sym => key.endsWith(sym)));
    const remKeys = keys.filter(key => ['-'].find(sym => key.endsWith(sym)));

    const getValues = keys => {
        return keys.flatMap(key => {
            const arr = _.compact([obj[key]].flat() ?? []);
            return arr.flatMap(val => val.split(','));
        });
    };

    const values = getValues(setKeys);
    const addValues = getValues(addKeys);
    const removeValues = getValues(remKeys);
    const result = _.uniq(_.compact(values.concat(addValues))).sort().filter(v => !removeValues.includes(v));

    const newObj = _.omit(obj, keys);
    return { ...newObj, [key]: result };

};
