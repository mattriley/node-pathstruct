module.exports = ({ self }) => (path, opts = {}) => {

    const { valid, errors } = self.validate(opts);
    if (!valid) throw (errors);

    const master = opts.cache[path] ?? (opts.cache[path] = self.invokeParsers(path));
    const current = opts.select ? _.get(opts.initial, opts.select, {}) : opts.initial;
    const targetSelected = opts.select ? _.get(master, opts.select, {}) : master;

    if (_.isPlainObject(targetSelected) && _.isPlainObject(current)) {
        _.defaultsDeep(targetSelected, current); // TODO: Prevent mutation
    }

    if (opts.pick.length && !_.isPlainObject(targetSelected)) {
        throw new Error('Failed to pick; target is not a plain object');
    }

    const targetPicked = opts.pick.length ? _.pick(targetSelected, opts.pick) : targetSelected;

    return self.transformValue(targetPicked);

};