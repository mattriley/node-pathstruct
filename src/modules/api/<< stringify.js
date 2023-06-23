module.exports = ({ writer }) => (path, options = {}) => {

    const defaultOptions = { pick: [] };
    return writer.write(path, { ...defaultOptions, ...options });

};
