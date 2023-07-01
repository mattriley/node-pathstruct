const nils = ['nil', 'null', '""', ''];
const removeSurroundingDoubleQuotes = str => str.replace(/^"(.*)"$/, '$1');

module.exports = ({ self }) => val => {

    if (_.isPlainObject(val)) return self.transformObject(val);
    if (Array.isArray(val)) return self.transformArray(val);
    if (nils.some(nil => val === nil)) return undefined;
    if (val.toString() === 'false') return false;
    if (val.toString() === 'true') return true;
    return removeSurroundingDoubleQuotes(val);

};
