module.exports = () => inputKeys => {

    const singulars = inputKeys.flatMap(key => key.replace(/s$/, '').replace(/es$/, ''));
    const plurals = singulars.flatMap(key => [`${key}s`, `${key}es`]);
    const resultKeys = _.uniq([...inputKeys, ...singulars, ...plurals]);
    const add = resultKeys.map(key => `${key}+`);
    const rem = resultKeys.map(key => `${key}-`);
    return [...resultKeys, ...add, ...rem];

};
