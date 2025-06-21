module.exports = () => (obj, opts) => {

    if (!opts.pick.length || (
        obj !== null &&
        typeof obj === 'object' &&
        Object.getPrototypeOf(obj) === Object.prototype
    )) {
        return obj;
    }

    throw new Error('Failed to pick; target is not a plain object');

};
