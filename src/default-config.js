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
    omit: [],
    initial: {},

    // Stringifier
    keyValueSeparator: '=',
    keyValueDelimiter: ' ',
    keyValueHeader: '',
    forceQuotes: false,

    // Both
    valueTerminator: ';',
    pathSeparator: '/',
    pathSeparatorEncoded: '>',

};
