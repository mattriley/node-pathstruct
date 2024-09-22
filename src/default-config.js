module.exports = {
    pathSeparator: '/',
    keyValueExpression: /(?<keypath>\S+)=(?<val>[^\]]*\]|"[^"]*"|\S*)/g,
    keyValueSeparator: '=',
    arrayValueExpression: /^\[(.*)\]$/,
    arrayDelimiter: ',',
    overrideDelimiter: '!'
};
