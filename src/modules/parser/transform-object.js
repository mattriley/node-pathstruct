const _ = require('lodash');

module.exports = ({ parser }) => obj => {

    const res = _.mapValues(obj, parser.transformValue);
    const empty = _.isEmpty(res) || Object.values(res).every(v => v === undefined);
    return empty ? undefined : res;

};
