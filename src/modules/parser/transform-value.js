const nils = ['nil', 'null', '""', ''];
const removeSurroundingDoubleQuotes = str => str.replace(/^"(.*)"$/, '$1');

module.exports = ({ self, config }) => val => {

    if (_.isPlainObject(val)) return self.transformObject(val);
    if (Array.isArray(val)) return self.transformArray(val);
    if (nils.some(nil => val === nil)) return undefined;
    if (val.toString() === 'false') return false;
    if (val.toString() === 'true') return true;
    val = val.replace(config.pathSeparatorEncoded, config.pathSeparator);
    return removeSurroundingDoubleQuotes(val);

};


