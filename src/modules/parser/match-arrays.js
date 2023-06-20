module.exports = () => str => {

    const matches = str.matchAll(/(?<key>\S+)=(?<val>\[[^\]]*\])/g);
    return [...matches];

};
