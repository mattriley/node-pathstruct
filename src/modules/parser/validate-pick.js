module.exports = () => (obj, opts) => {

    if (!opts.pick.length || _.isPlainObject(obj)) return obj;
    throw new Error('Failed to pick; target is not a plain object');

};
