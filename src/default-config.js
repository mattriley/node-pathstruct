module.exports = {
    keyValueExpression: /(?<keypath>\S+)=(?<val>[^\]]*\]|"[^"]*"|\S*)/g,
    arrayContentExpression: /^\[(.*)\]$/,
    pathSeparator: '/',
    keyValueSeparator: '=',
    arrayDelimiter: ',',
    overrideDelimiter: '!'
};
