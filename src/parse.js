const _ = require('lodash');

module.exports = (f, opts = {}) => {

    opts.pick = [opts.pick ?? []].flat(); // coerce `pick` into an array 

    let { initial = {}, select = null, pick = [], pathSep = '/', separator = '=', cache = {}, ...config } = opts;

    const parseValues = str => {
        const matches = str.matchAll(/(?<key>\S+)=(?<val>"[^"]*"|[\w-_+]+)/g);
        // should I add ' as a valid char 
        // star between quotes to allow empty string (to allow delete)
        return [...matches].reduce((acc, m) => {
            const val = m.groups.val.replaceAll('"', '');
            return _.set(acc, m.groups.key, val);
        }, {});
    };

    const parseArrays = str => {
        const matches = str.matchAll(/(?<key>\S+)=(?<val>\[[^\]]*\])/g);
        return [...matches].reduce((acc, m) => {
            let val = m.groups.val.split(',').map(val => val.replaceAll('[', '').replaceAll(']', '').trim());
            return _.set(acc, m.groups.key, val);
        }, {});
    };

    const parseKeyValuePairs = str => {
        const parsers = str.includes(separator) ? [parseValues, parseArrays] : [];
        const results = parsers.flatMap(p => p(str));
        return _.merge({}, ...results);
    };

    const getMasterObj = () => {
        if (cache[f]) return cache[f];
        const arr = f.split(pathSep);
        const entries = arr.filter(Boolean).map(parseKeyValuePairs);
        cache[f] = _.merge({}, ...entries);
        return cache[f];
    };

    const masterObj = getMasterObj();

    // if (_.isPlainObject(initial)) {
    //     if (!target) target = {};
    //     _.defaultsDeep(target, initial); // ok
    // }

    const current = select ? _.get(initial, select) : { ...initial };
    let target = select ? _.get(masterObj, select) : { ...masterObj };

    if (_.isPlainObject(initial)) {
        _.defaultsDeep(target, current); // ok
    }

    if (!_.isPlainObject(target) && pick.length) {
        throw new Error('Cannot pick from non-object');
    }

    target = pick.length ? _.pick(target, pick) : target;

    // assuming unused
    // if (Array.isArray(selected) && !selected.length) return config.default;
    // if (selected === '') return config.default;





    // assuming unused
    // if (Array.isArray(selected)) {
    //     return selected.length ? selected : config.default; // works now for arrays
    // }

    // if (!target && !Object.keys(master).includes(select)) {
    //     return initial || config.default;
    // }


    const transformValue = val => {
        // must be undefined (null prob ok)
        // if omitting, it will be reassigned by mergeMetadata.js
        // because it's simply not there.
        if (val === '') return undefined;
        if (val === null) return undefined;
        if (val === 'false') return false;
        if (val === 'true') return true;
        if (Array.isArray(val)) return transformArray(val);
        if (_.isPlainObject(val)) return transformObject(val);
        return val;
    };

    const transformArray = arr => {
        const res = arr.map(transformValue).filter(v => v !== undefined);
        return res.length ? res : undefined;
    };

    const transformObject = obj => {
        const res = _.mapValues(obj, transformValue);
        const empty = _.isEmpty(res) || Object.values(res).every(v => v === undefined);
        return empty ? undefined : res;
    };

    return transformValue(target);

};
