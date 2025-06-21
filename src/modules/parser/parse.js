const pathlib = require('node:path');
const mergeWith = require('lodash.mergewith');

module.exports = ({ self }) => (path, options = {}) => {

    const { valid, errors } = self.validate({ path, options });
    if (!valid) throw (errors);

    const defaultOptions = { select: undefined, aliases: {}, pick: [], cache: {}, initial: {} };
    // const opts = _.defaults({}, options, defaultOptions);
    const opts = { ...defaultOptions, ...options }

    const aliasLookup = Object.fromEntries(Object.entries(opts.aliases).flatMap(([key, aliases]) => {
        return aliases.map(alias => [alias, key]);
    }));

    const parsedPath = pathlib.parse(path);
    const pathWithoutExt = parsedPath.ext.includes('=') ? path : pathlib.join(parsedPath.dir, parsedPath.name);
    const mergeCustomiser = (objValue, srcValue) => { if (Array.isArray(objValue)) return [srcValue].flat(); };

    return $.fun.pipe([
        obj => obj ?? (opts.cache[path] = self.baseParse(pathWithoutExt)),
        obj => opts.select ? $.obj.getDeep(obj, opts.select, {}) : obj,
        obj => $.obj.isPlain(obj) ? mergeWith({}, opts.initial, obj, mergeCustomiser) : obj,
        obj => $.obj.isPlain(obj) ? self.applyAliases(obj, aliasLookup) : obj,
        obj => self.applyOperatorsInPlace(obj),
        obj => self.validatePick(obj, opts),
        obj => opts.pick.length ? $.obj.pickDeep(obj, opts.pick) : obj,
        obj => self.transformValue(obj)
    ])(opts.cache[path]);

};
