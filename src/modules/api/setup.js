module.exports = ({ parser, stringifier, array }) => () => {

    return { ...parser, ...stringifier, array };

};
