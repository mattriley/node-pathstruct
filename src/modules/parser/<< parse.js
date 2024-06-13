const mergeCustomizer = (objValue, srcValue) => {
    if (Array.isArray(objValue)) return [srcValue].flat();
};

module.exports = ({ self }) => (path, options = {}) => {

    const { valid, errors } = self.validate({ path, options });
    if (!valid) throw (errors);

    const defaultOptions = { select: undefined, aliases: {}, pick: [], cache: {}, initial: {} };
    const opts = { ...defaultOptions, ...options };

    const aliasLookup = Object.fromEntries(Object.entries(opts.aliases).flatMap(([key, aliases]) => {
        return aliases.map(alias => [alias, key]);
    }));

    return _.flow([
        obj => obj ?? (opts.cache[path] = self.invokeParsers(path)),
        obj => {
            return Object.entries(obj).reduce((acc, [key, val]) => {
                const operator = ['+', '-'].find(op => key.endsWith(op));
                const cleanKey = operator ? key.slice(0, -1) : key;
                const mainKey = aliasLookup[cleanKey] ?? cleanKey;
                const newKey = mainKey + (operator ?? '');
                acc[newKey] = val;
                return acc;
            }, {});
        },
        obj => opts.select ? _.get(obj, opts.select, {}) : obj,
        obj => _.isPlainObject(obj) ? _.mergeWith({}, opts.initial, obj, mergeCustomizer) : obj,
        obj => {
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
        },
        obj => {
            if (!opts.pick.length || _.isPlainObject(obj)) return obj;
            throw new Error('Failed to pick; target is not a plain object');
        },
        obj => opts.pick.length ? _.pick(obj, opts.pick) : obj,
        obj => self.transformValue(obj)
    ])(opts.cache[path]);

};
