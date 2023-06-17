const _ = require('lodash');

module.exports = (f, opts = {}) => {

    opts.pick = [opts.pick ?? []].flat(); // coerce `pick` into an array 

    let { initial = {}, select = null, pick = [], pathSep = '/', separator = '=', cache = {}, ...config } = opts;


    const parseArrays = str => {
        const matches = str.matchAll(/(?<key>\S+)=(?<val>\[[^\]]*\])/g);
        return [...matches].reduce((acc, m) => {
            let val = m.groups.val.split(',').map(val => val.replaceAll('[', '').replaceAll(']', '').trim());
            return _.set(acc, m.groups.key, val);
        }, {});
    };

    const parseKeyValuePairs = str => {
        if (!str.includes(separator)) return {};


        const matches = str.matchAll(/(?<key>\S+)=(?<val>"[^"]*"|[\w-_+]+)/g);
        // should I add ' as a valid char 
        // star between quotes to allow empty string (to allow delete)
        const matches1 = [...matches];

        const res1 = matches1.reduce((acc, m) => {
            const val = m.groups.val.replaceAll('"', '');
            return _.set(acc, m.groups.key, val);
        }, {});

        const res2 = parseArrays(str);
        const fin = _.merge({}, res1, res2);
        return fin;

    };



    const getMasterObj = () => {
        if (cache[f]) return cache[f];
        const arr = f.split(pathSep);
        const entries = arr.filter(Boolean).map(parseKeyValuePairs);
        cache[f] = _.merge({}, ...entries);
        return cache[f];
    };

    const masterObj = getMasterObj();

    let selected = select ? _.get(masterObj, select) : { ...masterObj };

    if (!_.isPlainObject(selected) && pick.length) {
        throw new Error('Cannot pick from non-object');
    }

    selected = pick.length ? _.pick(selected, pick) : selected;

    // assuming unused
    // if (Array.isArray(selected) && !selected.length) return config.default;
    // if (selected === '') return config.default;



    if (_.isPlainObject(initial)) {
        if (!selected) selected = {};
        _.defaultsDeep(selected, initial); // ok
    }

    // assuming unused
    // if (Array.isArray(selected)) {
    //     return selected.length ? selected : config.default; // works now for arrays
    // }

    if (!selected && !Object.keys(masterObj).includes(select)) {
        return initial || config.default;
    }


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

    return transformValue(selected);

};
