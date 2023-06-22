const matchArrays = str => [...str.matchAll(/(?<key>\S+)=(?<val>\[[^\]]*\])/g)];
const removeSurroundingSquareBrackets = str => str.replace(/^\[(.*)\]$/, '$1');

module.exports = ({ config }) => str => {
    return matchArrays(str).reduce((acc, m) => {
        const { key, val } = m.groups;
        const arr = removeSurroundingSquareBrackets(val).split(config.arrayDelimiter);
        return _.set(acc, key, arr);
    }, {});
};
