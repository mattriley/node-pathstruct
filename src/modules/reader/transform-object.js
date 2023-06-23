module.exports = ({ self }) => obj => {

    const res = _.mapValues(obj, self.transformValue);
    const empty = _.isEmpty(res) || Object.values(res).every(v => v === undefined);
    return empty ? undefined : res;

};
