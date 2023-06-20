const _ = require('lodash');
const nils = ['nil', 'null', '""', ''];
const removeSurroundingDoubleQuotes = str => str.replace(/^"(.*)"$/, '$1');

module.exports = ({ parser }) => val => {

    if (_.isPlainObject(val)) return parser.transformObject(val);
    if (Array.isArray(val)) return parser.transformArray(val);
    if (nils.some(nil => val === nil)) return undefined;
    if (val === 'false') return false;
    if (val === 'true') return true;
    return removeSurroundingDoubleQuotes(val);

};
