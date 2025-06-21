// Optimised on 21 June 2025 with help from ChatGPT.

const nils = ['nil', 'null', '""', ''];
const removeSurroundingDoubleQuotes = str => str.replace(/^"(.*)"$/, '$1');

// Native plain object check (safer/faster than Lodash)
const isPlainObject = val =>
    val !== null &&
    typeof val === 'object' &&
    Object.getPrototypeOf(val) === Object.prototype;

module.exports = ({ self, config }) => val => {

    if (isPlainObject(val)) return self.transformObject(val);
    if (Array.isArray(val)) return self.transformArray(val);
    if (nils.includes(val)) return undefined;

    const str = val.toString();

    if (str === 'false') return false;
    if (str === 'true') return true;

    const replaced = str.replace(config.pathSeparatorEncoded, config.pathSeparator);
    return removeSurroundingDoubleQuotes(replaced);

};
