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
        obj => self.applyAliases(obj, aliasLookup),
        obj => opts.select ? _.get(obj, opts.select, {}) : obj,
        obj => _.isPlainObject(obj) ? _.mergeWith({}, opts.initial, obj, self.arrayMergeCustomizer) : obj,
        obj => self.applyOperators(obj),
        obj => {
            if (!opts.pick.length || _.isPlainObject(obj)) return obj;
            throw new Error('Failed to pick; target is not a plain object');
        },
        obj => opts.pick.length ? _.pick(obj, opts.pick) : obj,
        obj => self.transformValue(obj)
    ])(opts.cache[path]);

};
