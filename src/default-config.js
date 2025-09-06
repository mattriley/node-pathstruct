module.exports = {
    keyValueExpression: /(?<key>\S+)=(?<val>\[[^\]]*\]|"[^"]*"|\S*)/g,
    keyValueSeparator: '=',
    keyValueDelimiter: ' ',
    arrayDelimiter: ',',
    overrideDelimiter: '!',
    pathSeparator: '/',
    pathSeparatorEncoded: '>',
    forceQuotes: false,
    nils: ['nil', 'null', '""', ''],
    markers: { '@': 'attributes', '#': 'tags', '$': 'flags' }
};
