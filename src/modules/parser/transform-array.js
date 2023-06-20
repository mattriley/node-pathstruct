module.exports = ({ parser }) => arr => {

    const res = arr.map(parser.transformValue).filter(v => v !== undefined);
    return res.length ? res : undefined;

};