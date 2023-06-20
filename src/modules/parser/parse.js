const _ = require('lodash');

const removeSurroundingDoubleQuotes = str => str.replace(/^"(.*)"$/, '$1');
const removeSurroundingSquareBrackets = str => str.replace(/^\[(.*)\]$/, '$1');

module.exports = ({ parser, config }) => (f, opts = {}) => {

    opts.pick = [opts.pick ?? []].flat(); // coerce `pick` into an array 

    const {
        initial = {},
        select = null,
        pick = [],
        cache = {},
        pathSeparator,
        keyValueSeparator,
        arrayDelimiter
    } = { ...config, ...opts };

    if (!_.isPlainObject(initial)) throw new Error('initial must be a plain object');
    if (!Array.isArray(pick)) throw new Error('pick must be an array');
    if (select && typeof select !== 'string') throw new Error('select must be a string');

    const matchValues = str => {
        const matches = str.matchAll(/(?<key>\S+)=(?<val>"[^"]*"|[\w-_+]+)/g);
        return [...matches];
    };

    const parseValues = str => {
        return matchValues(str).reduce((acc, m) => {
            const { key, val } = m.groups;
            return _.set(acc, key, val);
        }, {});
    };

    const parseKeyValuePairs = str => {
        const parsers = str.includes(keyValueSeparator) ? [parseValues, parser.parseArrays] : [];
        const results = parsers.flatMap(p => p(str));
        return _.merge({}, ...results);
    };

    const getMasterObj = () => {
        if (cache[f]) return cache[f];
        const arr = f.split(pathSeparator);
        const entries = arr.filter(Boolean).map(parseKeyValuePairs);
        cache[f] = _.merge({}, ...entries);
        return cache[f];
    };

    const master = getMasterObj();
    const current = select ? _.get(initial, select, {}) : initial;
    const targetSelected = select ? _.get(master, select, {}) : master;

    if (_.isPlainObject(targetSelected) && _.isPlainObject(current)) {
        _.defaultsDeep(targetSelected, current); // TODO: Prevent mutation
    }

    if (!_.isPlainObject(targetSelected) && pick.length) {
        throw new Error('Cannot pick from non-object');
    }

    const targetPicked = pick.length ? _.pick(targetSelected, pick) : targetSelected;

    return parser.transformValue(targetPicked);

};
