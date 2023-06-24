module.exports = ({ stringifier }) => (path, options = {}) => {

    const defaultOptions = { pick: [] };
    return stringifier.stringify(path, { ...defaultOptions, ...options });

};
