module.exports = ({ reader }) => (path, options = {}) => {

    const defaultOptions = { select: undefined, pick: [], cache: {}, initial: {} };
    return reader.read(path, { ...defaultOptions, ...options });

};
