const _ = require('lodash');

module.exports = (f, opts = {}) => {

    opts.pick = [opts.pick ?? []].flat(); // coerce `pick` into an array 

    let { initial = {}, select = null, pick = [], pathSep = '/', separator = '=', cache = {} } = opts;

    if (!_.isPlainObject(initial)) throw new Error('initial must be a plain object');
    if (!Array.isArray(pick)) throw new Error('pick must be an array');
    if (select && typeof select !== 'string') throw new Error('select must be a string');

    const parseValues = str => {
        const matches = str.matchAll(/(?<key>\S+)=(?<val>"[^"]*"|[\w-_+]+)/g);
        return [...matches].reduce((acc, m) => _.set(acc, m.groups.key, m.groups.val), {});
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

    const master = getMasterObj();

    // if (_.isPlainObject(initial)) {
    //     if (!target) target = {};
    //     _.defaultsDeep(target, initial); // ok
    // }



    const current = select ? _.get(initial, select, {}) : initial;
    let target = select ? _.get(master, select, {}) : master;

    if (_.isPlainObject(target) && _.isPlainObject(current)) {
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
        if (_.isPlainObject(val)) return transformObject(val);
        if (Array.isArray(val)) return transformArray(val);

        const nils = ['nil', 'null', '""', ''];
        if (nils.some(nil => val === nil)) return undefined;

        if (val === 'false') return false;
        if (val === 'true') return true;

        return val.replaceAll('"', '');
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
