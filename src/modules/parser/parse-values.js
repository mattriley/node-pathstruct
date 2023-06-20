const _ = require('lodash');

module.exports = ({ parser }) => str => {

    return parser.matchValues(str).reduce((acc, m) => {
        const { key, val } = m.groups;
        return _.set(acc, key, val);
    }, {});

};
