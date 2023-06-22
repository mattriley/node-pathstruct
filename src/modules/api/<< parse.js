module.exports = ({ parserCore }) => (path, options = {}) => {

    const defaultOptions = { select: undefined, pick: [], cache: {}, initial: {} };
    return parserCore.parse(path, { ...defaultOptions, ...options });

};
