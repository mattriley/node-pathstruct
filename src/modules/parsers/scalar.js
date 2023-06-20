const _ = require('lodash');

const matchScalar = str => [...str.matchAll(/(?<key>\S+)=(?<val>"[^"]*"|[\w-_+]+)/g)];

module.exports = () => str => {
    return matchScalar(str).reduce((acc, m) => {
        const { key, val } = m.groups;
        return _.set(acc, key, val);
    }, {});
};
