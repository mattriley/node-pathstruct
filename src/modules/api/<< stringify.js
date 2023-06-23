module.exports = ({ writer }) => (path, options = {}) => {

    return writer.write(path, options);

};
