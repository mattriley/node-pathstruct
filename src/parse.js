const _ = require('lodash');

module.exports = (f, opts = {}) => {

    const { initial = {}, select = [], pick = [], separator = '=', cache = {}, ...config } = opts;

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


        const arrMatches = str.matchAll(/(?<key>\S+)=(?<val>\[[^\]]*\])/g);
        const arrMatches1 = [...arrMatches].filter(s => s.length > 0);


        const res2 = arrMatches1.reduce((acc, m) => {
            const val = m.groups.val.split(',').map(val => val.replaceAll('[', '').replaceAll(']', '').trim());
            return _.set(acc, m.groups.key, val);
        }, {});


        const fin = _.merge({}, res1, res2);


        return fin;


    };



    const parseArr = arr => arr.filter(Boolean).map(parseKeyValuePairs);



    const targetPath = f;
    // const targetPath = path.join(f.reldirpath, f.name); // first dot to allow many
    // need to reconsider how to do this

    const getMasterObj = () => {
        if (cache[targetPath]) {
            console.warn('cache hit');
            return cache[targetPath];
        }

        const arr = targetPath.split('/');

        const entries = parseArr(arr);

        // console.warn(entries);


        const masterObj = _.merge({}, ...entries); // ??


        cache[targetPath] = masterObj;
        return cache[targetPath];
    };


    const masterObj = getMasterObj();


    let selected = _.get(masterObj, select); // ok

    if (Array.isArray(selected) && !selected.length) return config.default;


    if (selected === '') return config.default;


    if (_.isPlainObject(initial)) {
        if (!selected) selected = {};
        _.defaultsDeep(selected, initial); // ok
    }

    // const pickKeys = pick ?? [];
    // const picks = _.pick(masterObj, pickKeys);

    // if (pickKeys.length) {
    //     if (!selected) selected = {};
    //     _.merge(selected, picks);
    // }

    // const pickKeys = pick ?? [];
    const picks = pick.length ? _.pick(masterObj, pick) : { ...masterObj };

    // if (pick.length) {
    if (!selected) selected = {};
    _.merge(selected, picks);
    // }


    if (Array.isArray(selected)) {
        return selected.length ? selected : config.default; // works now for arrays
    }

    if (!selected && !Object.keys(masterObj).includes(select)) {
        return initial || config.default;
    }


    if (!_.isObject(selected)) {
        if (selected === 'false') return false;
        if (selected === 'true') return true;


        return selected ? selected : config.default;
    }

    if (select === 'event') {
        if (selected.subject && !selected.subjects) {
            selected.subjects = [selected.subject];
        }

        if (selected.subject1) {
            const subjects = _.compact([selected.subject1, selected.subject2]);
            selected.subjects = subjects;
        }

        delete selected.subject;
        delete selected.subject1;
        delete selected.subject2;
    }


    // if an object:

    try {

        const emptyRemoved = Object.keys(selected).reduce((acc, k) => {


            let v = selected[k];

            if (v === 'false') v = false;
            if (v === 'true') v = true;

            if (Array.isArray(v) && !v.length) v = undefined;

            if (!v || v === '') v = undefined;
            // must be undefined (null prob ok)
            // if omitting, it will be reassigned by mergeMetadata.js
            // because it's simply not there.

            return { ...acc, [k]: v };
        }, {});

        if (_.isEmpty(emptyRemoved)) return undefined; // here

        const allUndefined = Object.values(emptyRemoved).every(val => val === undefined);
        if (allUndefined) return undefined;

        return emptyRemoved;
    } catch (err) {
        console.error(err);
    }
};
