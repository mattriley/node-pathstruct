module.exports = ({ self, config }) => (f, opts = {}) => {

    opts.pick = [opts.pick ?? []].flat(); // coerce `pick` into an array 

    const {
        initial = {},
        select = null,
        pick = [],
        cache = {},
        pathSeparator,
        keyValueSeparator
    } = { ...config, ...opts };

    if (!_.isPlainObject(initial)) throw new Error('initial must be a plain object');
    if (!Array.isArray(pick)) throw new Error('pick must be an array');
    if (select && typeof select !== 'string') throw new Error('select must be a string');

    const getMasterObj = () => {
        if (cache[f]) return cache[f];
        cache[f] = self.invokeParsers(f)
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

    return self.transformValue(targetPicked);

};
