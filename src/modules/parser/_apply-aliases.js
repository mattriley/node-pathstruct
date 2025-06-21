// Optimised on 21 June 2025.

module.exports = () => (obj, aliasLookup) => {

    const result = {};

    for (const [key, val] of Object.entries(obj)) {
        const operator = key.endsWith('+') ? '+' : key.endsWith('-') ? '-' : '';
        const cleanKey = operator ? key.slice(0, -1) : key;
        const preferredKey = aliasLookup[cleanKey] ?? cleanKey;
        const newKey = preferredKey + operator;
        result[newKey] = val;
    }

    return result;

};
