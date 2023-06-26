module.exports = ({ self }) => (val, options = {}) => {

    const opts = { quoteSpaces: true, ...options };

    if (self.isEmpty(val)) return undefined;
    if (Array.isArray(val)) return self.stringifyArray(val);
    const str = val.toString().replace('/', '_').trim();
    const shouldQuote = (str.includes(' ') && opts.quoteSpaces) || val === 'true' || val === 'false';
    return shouldQuote ? `"${str}"` : str;

};

