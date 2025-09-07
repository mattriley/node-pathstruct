const pathlib = require('node:path');
const mergeWith = require('lodash.mergewith');
const cache = {};

module.exports = ({ self, $, globalConfig }) => config => {

    const parseOptions = $.fun.parseConfig(globalConfig, config);

    return (path, ...options) => {
        options = parseOptions(options);

        const aliasLookup = Object.fromEntries(Object.entries(options.aliases).flatMap(([key, aliases]) => {
            return aliases.map(alias => [alias, key]);
        }));

        const parsedPath = pathlib.parse(path);
        const pathWithoutExt = parsedPath.ext.includes('=') ? path : pathlib.join(parsedPath.dir, parsedPath.name);
        const mergeCustomiser = (objValue, srcValue) => { if (Array.isArray(objValue)) return [srcValue].flat(); };

        cache[path] ??= self.baseParse(pathWithoutExt, options);

        return $.pipe([
            () => cache[path],
            obj => options.select ? $.obj.dig(obj, options.select, {}) : obj,
            obj => $.obj.isPlain(obj) ? mergeWith({}, options.initial, obj, mergeCustomiser) : obj,
            obj => $.obj.isPlain(obj) ? self.applyAliases(obj, aliasLookup) : obj,
            obj => self.applyOperatorsInPlace(obj),
            obj => self.validatePick(obj, options),
            obj => options.pick.length ? $.obj.pick(obj, options.pick) : obj,
            obj => self.transformValue(obj)
        ])();

    };
};
