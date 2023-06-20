module.exports = () => str => {

    const matches = str.matchAll(/(?<key>\S+)=(?<val>"[^"]*"|[\w-_+]+)/g);
    return [...matches];

};
