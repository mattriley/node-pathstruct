const _ = require('lodash');

const removeSurroundingSquareBrackets = str => str.replace(/^\[(.*)\]$/, '$1');

module.exports = ({ parser, config }) => str => {

    return parser.matchArrays(str).reduce((acc, m) => {
        const { key, val } = m.groups;
        const arr = removeSurroundingSquareBrackets(val).split(config.arrayDelimiter);
        return _.set(acc, key, arr);
    }, {});

};
