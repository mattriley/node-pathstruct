module.exports = {

    // Parser
    keyValueExpression: /(?<key>\S+)=(?<val>\[[^\]]*\]|"[^"]*"|\S*)/g,
    arrayDelimiter: ',',
    overrideDelimiter: '!',
    nils: ['nil', 'null', '""', ''],
    markers: { '@': 'attributes', '#': 'tags', '$': 'flags' },
    select: null,
    aliases: {},
    pick: [],
    initial: {},
    valueTerminator: ';',

    // Stringifier
    keyValueSeparator: '=',
    keyValueDelimiter: ' ',
    keyValueHeader: '',
    forceQuotes: false,

    // Both
    pathSeparator: '/',
    pathSeparatorEncoded: '>'
};
