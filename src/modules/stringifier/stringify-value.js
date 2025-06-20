module.exports = ({ self, config }) => (val, options = {}) => {

    const opts = { quoteSpaces: true, forceQuotes: false, ...options };

    if (self.isEmpty(val)) return undefined;
    if (Array.isArray(val)) return self.stringifyArray(val);
    const str = val.toString().replace(config.pathSeparator, config.pathSeparatorEncoded).trim();
    const shouldQuote = (str.includes(' ') && opts.quoteSpaces) || val === 'true' || val === 'false';
    return shouldQuote || opts.forceQuotes ? `"${str}"` : str;

};
