module.exports = ({ parser, stringifier }) => () => {

    return { ...parser, ...stringifier };

};
