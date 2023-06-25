module.exports = ({ self }) => val => {

    const csv = val.map(val => self.stringifyValue(val)).join(',');
    return `[${csv}]`;

};

