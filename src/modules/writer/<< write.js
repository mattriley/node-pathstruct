const flat = require('flat');

module.exports = ({ self, util, config }) => (obj, opts = {}) => {

    const keys = opts.pick.length ? opts.pick : Object.keys(flat(obj, { safe: true }));

    return keys.flatMap(key => {
        const val = _.get(obj, key);
        if (util.isEmpty(val)) return [];
        return [key, self.stringifyValue(val)].join(config.keyValueSeparator);
    }).join(' ');

};

