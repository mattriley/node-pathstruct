module.exports = () => obj => {

    return Object.entries(obj).reduce((acc, [key, val]) => {
        const operations = {
            '+': target => target.concat(val),
            '-': target => target.filter(s => !val.includes(s))
        };
        const operator = key.slice(-1);
        const targetKey = key.slice(0, -1);
        const operation = operations[operator];
        if (!operation) return acc;
        delete acc[key];
        return { ...acc, [targetKey]: operation(acc[targetKey] ?? []) };
    }, obj);

};
