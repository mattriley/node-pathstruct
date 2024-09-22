module.exports = {
    keyValueExpression: /(?<key>\S+)=(?<val>\[[^\]]*\]|"[^"]*"|\S*)/g,
    keyValueSeparator: '=',
    arrayDelimiter: ',',
    overrideDelimiter: '!',
    pathSeparator: '/'
};
