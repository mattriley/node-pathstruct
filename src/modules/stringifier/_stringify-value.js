// Optimised on 21 June 2025 with help from ChatGPT.

module.exports = ({ self, config }) => (val, options = {}) => {

    if (self.isEmpty(val)) return undefined;
    if (Array.isArray(val)) return self.stringifyArray(val);

    const opts = { quoteSpaces: true, forceQuotes: false, ...options };

    let str = val.toString().trim();

    // Avoid .replace unless needed
    if (str.includes(config.pathSeparator)) {
        str = str.replace(config.pathSeparator, config.pathSeparatorEncoded);
    }

    const shouldQuote = opts.forceQuotes || (opts.quoteSpaces && str.includes(' ')) || $.bool.isLiteralBoolean(val);

    return shouldQuote ? `"${str}"` : str;

};
