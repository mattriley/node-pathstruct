module.exports = ({ self }) => arr => {

    const res = arr.map(self.transformValue).filter(v => v !== undefined);
    return res.length ? res : undefined;

};
