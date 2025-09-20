module.exports = () => (obj, aliasLookup) => {
    const getOperator = key => {
        if (key.endsWith('+')) return '+';
        if (key.endsWith('-')) return '-';
        return '';
    };

    const result = {};

    for (const [key, val] of Object.entries(obj)) {
        const operator = getOperator(key);
        const cleanKey = operator ? key.slice(0, -1) : key;
        const preferredKey = aliasLookup[cleanKey] ?? cleanKey;
        result[preferredKey + operator] = val;
    }

    return result;
};
