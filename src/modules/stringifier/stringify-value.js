module.exports = ({ self, util }) => val => {

    if (util.isEmpty(val)) return undefined;
    if (Array.isArray(val)) return self.stringifyArray(val);
    const str = val.toString().replace('/', '_').trim();
    const shouldQuote = str.includes(' ') || val === 'true' || val === 'false';
    return shouldQuote ? `"${str}"` : str;

};

