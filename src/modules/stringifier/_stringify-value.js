module.exports = ({ self, config, $ }) => (val, options = {}) => {

    if (self.isEmpty(val)) return null;
    if (Array.isArray(val)) return self.stringifyArray(val);

    const opts = { quoteSpaces: true, forceQuotes: false, ...options };

    let str = val.toString().trim();

    // Avoid .replace unless needed
    if (str.includes(config.pathSeparator)) {
        str = str.replace(config.pathSeparator, config.pathSeparatorEncoded);
    }

    const isBoolLiteral = $.bool.isLiteralBoolean(val);

    // If it's a literal boolean and not forcing quotes, quote it so it stays a string on parse.
    if (isBoolLiteral && !opts.forceQuotes) {
        return `"${str}"`;
    }

    // If it contains spaces and we're not forcing quotes, terminate instead: key=foo bar;
    // (Assumes the caller appends key= and parsing supports valueTerminator.)
    if (!opts.forceQuotes && opts.quoteSpaces && str.includes(' ')) {
        return `${str}${config.valueTerminator || ';'}`;
    }

    // Otherwise: quote if forced, else plain
    return opts.forceQuotes ? `"${str}"` : str;

};
