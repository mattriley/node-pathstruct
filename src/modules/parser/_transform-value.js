// Optimised on 21 June 2025 with help from ChatGPT.

module.exports = ({ self, config, $ }) => val => {

    if ($.obj.isPlain(val)) return self.transformObject(val);
    if (Array.isArray(val)) return self.transformArray(val);
    if (config.nils.includes(val)) return null;
    if (val === null) return null;

    const str = val.toString();
    if ($.bool.isLiteralBoolean(str)) return $.bool.toBooleanFromLiteral(str);

    const replaced = str.replace(config.pathSeparatorEncoded, config.pathSeparator);
    return $.str.dequote(replaced, '"');

};
