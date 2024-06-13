module.exports = () => (obj, aliasLookup) => {

    return Object.entries(obj).reduce((acc, [key, val]) => {
        const operator = ['+', '-'].find(op => key.endsWith(op));
        const cleanKey = operator ? key.slice(0, -1) : key;
        const mainKey = aliasLookup[cleanKey] ?? cleanKey;
        const newKey = mainKey + (operator ?? '');
        return { ...acc, [newKey]: val };
    }, {});

};
