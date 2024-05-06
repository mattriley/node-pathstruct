module.exports = () => plurals => {

    const singulars = plurals.flatMap(key => key.replace(/s$/, '').replace(/es$/, ''));
    const keys = [...plurals, ...singulars];
    const add = keys.map(key => `${key}+`);
    const rem = keys.map(key => `${key}-`);
    return [...keys, ...add, ...rem];

};
