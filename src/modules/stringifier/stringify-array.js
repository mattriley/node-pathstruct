module.exports = ({ self }) => val => {

    const csv = val.flatMap(val => self.stringifyValue(val) ?? []).join(',');
    return `[${csv}]`;

};

