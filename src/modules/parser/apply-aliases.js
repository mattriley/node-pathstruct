module.exports = () => (obj, aliasLookup) => {

    return _.mapKeys(obj, (val, key) => {
        const operator = ['+', '-'].find(op => key.endsWith(op)) ?? '';
        const cleanKey = operator ? key.slice(0, -1) : key;
        const preferredKey = aliasLookup[cleanKey] ?? cleanKey;
        return preferredKey + operator;
    });

};
