module.exports = ({ $ }) => (obj, opts) => {

    if (!opts.omit.length || $.obj.isPlain(obj)) return obj;
    throw new Error('Failed to omit; target is not a plain object');

};
