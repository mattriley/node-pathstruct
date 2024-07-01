const pathlib = require('node:path');

module.exports = ({ self }) => (path, options = {}) => {

    const { valid, errors } = self.validate({ path, options });
    if (!valid) throw (errors);

    const defaultOptions = { select: undefined, aliases: {}, pick: [], cache: {}, initial: {} };
    const opts = _.defaults({}, options, defaultOptions);

    const aliasLookup = Object.fromEntries(Object.entries(opts.aliases).flatMap(([key, aliases]) => {
        return aliases.map(alias => [alias, key]);
    }));

    const parsedPath = pathlib.parse(path);
    const pathWithoutExt = parsedPath.ext.includes('=') ? path : pathlib.join(parsedPath.dir, parsedPath.name);

    return _.flow([
        obj => obj ?? (opts.cache[path] = self.invokeParsers(pathWithoutExt)),
        obj => opts.select ? _.get(obj, opts.select, {}) : obj,
        obj => _.isPlainObject(obj) ? _.mergeWith({}, opts.initial, obj, self.arrayMergeCustomizer) : obj,
        obj => _.isPlainObject(obj) ? self.applyAliases(obj, aliasLookup) : obj,
        obj => self.applyOperators(obj),
        obj => self.validatePick(obj, opts),
        obj => opts.pick.length ? _.pick(obj, opts.pick) : obj,
        obj => self.transformValue(obj)
    ])(opts.cache[path]);

};
