const mergeCustomizer = (objValue, srcValue) => {
    if (Array.isArray(objValue)) return srcValue;
};

module.exports = ({ self }) => (path, options = {}) => {

    const { valid, errors } = self.validate({ path, options });
    if (!valid) throw (errors);

    const defaultOptions = { select: undefined, pick: [], cache: {}, initial: {} };
    const opts = { ...defaultOptions, ...options };

    return _.flow([
        obj => obj ?? (opts.cache[path] = self.invokeParsers(path)),
        obj => opts.select ? _.get(obj, opts.select, {}) : obj,
        obj => _.isPlainObject(obj) ? _.mergeWith({}, opts.initial, obj, mergeCustomizer) : obj,
        obj => {
            if (!opts.pick.length || _.isPlainObject(obj)) return obj;
            throw new Error('Failed to pick; target is not a plain object');
        },
        obj => opts.pick.length ? _.pick(obj, opts.pick) : obj,
        obj => self.transformValue(obj)
    ])(opts.cache[path]);

};
