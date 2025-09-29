module.exports = () => (obj, aliasLookup) => {
    const result = {};
    const suffixOps = { '+': true, '-': true };

    for (const [key, val] of Object.entries(obj)) {
        const lastChar = key[key.length - 1];
        const hasOp = suffixOps[lastChar];
        const cleanKey = hasOp ? key.slice(0, -1) : key;
        const preferredKey = aliasLookup[cleanKey] ?? cleanKey;
        result[hasOp ? preferredKey + lastChar : preferredKey] = val;
    }

    return result;
};
