const pathlib = require('node:path');
const mergeWith = require('lodash.mergewith');

module.exports = ({ self, $, _ }) => {

    const cache = {};

    return (path, options = {}) => {
        const { valid, errors } = self.validate({ path, options });
        if (!valid) throw (errors);

        const defaultOptions = { select: undefined, aliases: {}, pick: [], initial: {} };
        const opts = _.defaults({}, options, defaultOptions);

        const aliasLookup = Object.fromEntries(Object.entries(opts.aliases).flatMap(([key, aliases]) => {
            return aliases.map(alias => [alias, key]);
        }));

        const parsedPath = pathlib.parse(path);
        const pathWithoutExt = parsedPath.ext.includes('=') ? path : pathlib.join(parsedPath.dir, parsedPath.name);
        const mergeCustomiser = (objValue, srcValue) => { if (Array.isArray(objValue)) return [srcValue].flat(); };

        cache[path] ??= self.baseParse(pathWithoutExt);

        return $.pipe([
            () => cache[path],
            obj => opts.select ? $.obj.dig(obj, opts.select, {}) : obj,
            obj => $.obj.isPlain(obj) ? mergeWith({}, opts.initial, obj, mergeCustomiser) : obj,
            obj => $.obj.isPlain(obj) ? self.applyAliases(obj, aliasLookup) : obj,
            obj => self.applyOperatorsInPlace(obj),
            obj => self.validatePick(obj, opts),
            obj => opts.pick.length ? $.obj.pick(obj, opts.pick) : obj,
            obj => self.transformValue(obj)
        ])();

    };

};
