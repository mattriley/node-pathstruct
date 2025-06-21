const operations = {
    '+': (target, val) => [target].flat().concat(val),
    '-': (target, val) => target.filter(s => !val.includes(s))
};

module.exports = () => obj => {
    for (const [key, val] of Object.entries(obj)) {
        const operator = key.slice(-1);
        const cleanKey = key.slice(0, -1);
        const operation = operations[operator];

        if (!operation) continue;

        const base = obj[cleanKey] ?? [];
        obj[cleanKey] = operation(base, val);
        delete obj[key]; // remove the original operator key
    }

    return obj;
};
