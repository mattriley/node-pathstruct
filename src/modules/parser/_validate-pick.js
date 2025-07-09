module.exports = ({ $ }) => (obj, opts) => {

    if (!opts.pick.length || $.obj.isPlain(obj)) return obj;
    throw new Error('Failed to pick; target is not a plain object');

};
