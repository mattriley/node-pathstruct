const _ = require('lodash');

const removeSurroundingDoubleQuotes = str => str.replace(/^"(.*)"$/, '$1');
const removeSurroundingSquareBrackets = str => str.replace(/^\[(.*)\]$/, '$1');

module.exports = ({ parser }) => arr => {

    const res = arr.map(parser.transformValue).filter(v => v !== undefined);
    return res.length ? res : undefined;

};
