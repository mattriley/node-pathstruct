const pathlib = require('node:path');
const mergeWith = require('lodash.mergewith');

module.exports = ({ self, $, defaults }) => config => {
    const parseOptions = $.fun.parseConfig(defaults, config);

    return (path, options) => {
        options = parseOptions(options);

        const aliasLookup = Object.fromEntries(Object.entries(options.aliases).flatMap(([key, aliases]) => {
            return aliases.map(alias => [alias, key]);
        }));

        const parsedPath = pathlib.parse(path);
        const pathWithoutExt = parsedPath.ext.includes(options.keyValueSeparator) ? path : pathlib.join(parsedPath.dir, parsedPath.name);
        const mergeCustomiser = (objValue, srcValue) => { if (Array.isArray(objValue)) return [srcValue].flat(); };

        return $.pipe([
            () => self.baseParse(pathWithoutExt, options),
            obj => options.select ? $.obj.dig(obj, options.select, {}) : obj,
            obj => $.obj.isPlain(obj) ? mergeWith({}, options.initial, obj, mergeCustomiser) : obj,
            obj => $.obj.isPlain(obj) ? self.applyAliases(obj, aliasLookup) : obj,
            obj => self.applyOperatorsInPlace(obj),
            obj => self.validatePick(obj, options),
            obj => options.pick.length ? $.obj.pick(obj, options.pick) : obj,
            obj => self.transformValue(obj)
        ]);

    };
};
