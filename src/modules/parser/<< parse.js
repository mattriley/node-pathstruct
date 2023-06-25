module.exports = ({ self }) => (path, opts = {}) => {

    const { valid, errors } = self.validate(opts);
    if (!valid) throw (errors);

    const original = opts.cache[path] ?? (opts.cache[path] = self.invokeParsers(path));
    const selected = opts.select ? _.get(original, opts.select, {}) : original;
    const defaulted = _.isPlainObject(selected) ? _.defaultsDeep(selected, opts.initial) : selected;

    if (opts.pick.length && !_.isPlainObject(defaulted)) {
        throw new Error('Failed to pick; target is not a plain object');
    }

    const picked = opts.pick.length ? _.pick(defaulted, opts.pick) : defaulted;
    return self.transformValue(picked);

};
