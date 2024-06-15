const operations = {
    '+': (target, val) => target.concat(val),
    '-': (target, val) => target.filter(s => !val.includes(s))
};

module.exports = () => obj => {

    return Object.entries(obj).reduce((acc, [key, val]) => {
        const operator = key.slice(-1);
        const targetKey = key.slice(0, -1);
        const operation = operations[operator];
        if (!operation) return acc;
        delete acc[key];
        const newVal = operation(acc[targetKey] ?? [], val);
        return { ...acc, [targetKey]: newVal };
    }, obj);

};
