module.exports = ({ stringifier }) => (obj, options = {}) => {

    const defaultOptions = { pick: Object.keys(obj) };
    return stringifier.stringify(obj, { ...defaultOptions, ...options });

};
