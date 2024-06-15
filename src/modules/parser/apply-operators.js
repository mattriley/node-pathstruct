const operations = {
    '+': (target, val) => target.concat(val),
    '-': (target, val) => target.filter(s => !val.includes(s))
};

module.exports = () => obj => {

    return Object.entries(obj).reduce((acc, [key, val]) => {
        const operator = key.slice(-1);
        const cleanKey = key.slice(0, -1);
        const operation = operations[operator];
        if (!operation) return acc;
        const newVal = operation(acc[cleanKey] ?? [], val);
        return Object.assign(_.omit(acc, [key]), { [cleanKey]: newVal });
    }, obj);

};
