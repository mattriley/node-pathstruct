// Optimised on 21 June 2025.

const operations = {
    '+': (target, val) => [target].flat().concat(val),
    '-': (target, val) => target.filter(s => !val.includes(s))
};

module.exports = () => obj => {

    return Object.entries(obj).reduce((acc, [key, val]) => {
        const operator = key.slice(-1);
        const cleanKey = key.slice(0, -1);
        const operation = operations[operator];
        if (!operation) return acc;
        const newVal = operation(acc[cleanKey] ?? [], val);
        const { [key]: _, ...rest } = acc;
        return { ...rest, [cleanKey]: newVal };
    }, obj);

};
