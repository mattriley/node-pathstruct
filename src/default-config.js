module.exports = {
    pathSeparator: '/',
    keyValueExpression: /(?<key>\S+)=(?<val>[^\]]*\]|"[^"]*"|\S*)/g,
    keyValueSeparator: '=',
    arrayValueExpression: /^\[(?<val>.*)\]$/,
    arrayDelimiter: ',',
    overrideDelimiter: '!'
};
