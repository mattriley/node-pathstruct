module.exports = ({ self }) => val => {

    const csv = val.map(val => self.stringifyValue(val, { quoteSpaces: false })).join(',');
    return `[${csv}]`;

};

