const flat = require('flat');

module.exports = ({ stringifier }) => (obj, options = {}) => {

    const defaultOptions = { pick: Object.keys(flat(obj, { safe: true })) };
    return stringifier.stringify(obj, { ...defaultOptions, ...options });

};
