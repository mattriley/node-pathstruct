const _ = require('lodash');

module.exports = (f, opts = {}) => {

    opts.pick = [opts.pick ?? []].flat(); // coerce `pick` into an array 

    let { initial = {}, select = null, pick = [], separator = '=', cache = {}, ...config } = opts;

    const parseKeyValuePairs = str => {
        if (!str.includes(separator)) return {};


        const matches = str.matchAll(/(?<key>\S+)=(?<val>"[^"]*"|[\w-_+]+)/g);
        // should I add ' as a valid char 
        // star between quotes to allow empty string (to allow delete)
        const matches1 = [...matches];

        // console.warn(1, matches1); // ok


        const res1 = matches1.reduce((acc, m) => {
            const val = m.groups.val.replaceAll('"', '');
            return _.set(acc, m.groups.key, val);
        }, {});

        // console.warn(2, res1); // ok


        const arrMatches = str.matchAll(/(?<key>\S+)=(?<val>\[[^\]]*\])/g);
        const arrMatches1 = [...arrMatches].filter(s => s.length > 0);



        const res2 = arrMatches1.reduce((acc, m) => {
            let val = m.groups.val.split(',').map(val => val.replaceAll('[', '').replaceAll(']', '').trim());
            if (val == '') val = undefined; // this is new to match behavior of empty string, previously returned ['']
            return _.set(acc, m.groups.key, val);
        }, {});


        const fin = _.merge({}, res1, res2);

        // console.warn(2, fin); // ok


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




        const masterObj = _.merge({}, ...entries); // ??
        // console.warn(masterObj);

        cache[targetPath] = masterObj;
        return cache[targetPath];
    };


    const masterObj = getMasterObj();

    // console.warn(masterObj); // ok


    // let selected = select ? _.get(masterObj, select) : { ...masterObj };

    let selected = select ? _.get(masterObj, select) : { ...masterObj };

    if (!_.isPlainObject(selected) && pick.length) {
        throw new Error('Cannot pick from non-object');
    }

    selected = pick.length ? _.pick(selected, pick) : selected;


    // console.warn(config.default)
    if (Array.isArray(selected) && !selected.length) return config.default;


    if (selected === '') return config.default;

    // console.warn(selected)


    if (_.isPlainObject(initial)) {
        if (!selected) selected = {};
        _.defaultsDeep(selected, initial); // ok
    }


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


    const transformValue = v => {
        // must be undefined (null prob ok)
        // if omitting, it will be reassigned by mergeMetadata.js
        // because it's simply not there.
        if (v === '') return undefined;
        if (v === null) return undefined;
        if (Array.isArray(v) && v.length === 0) return undefined;
        if (v === 'false') return false;
        if (v === 'true') return true;
        if (_.isPlainObject(v)) return transformValues(v);
        return v;
    };



    const transformValues = obj => _.mapValues(obj, transformValue);



    try {

        const emptyRemoved = transformValues(selected);

        if (_.isEmpty(emptyRemoved)) return undefined; // here

        const allUndefined = Object.values(emptyRemoved).every(val => val === undefined);
        if (allUndefined) return undefined;

        return emptyRemoved;
    } catch (err) {
        console.error(err);
    }
};
