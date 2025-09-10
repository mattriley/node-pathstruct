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
    cache: {},

    // Stringifier
    keyValueSeparator: '=',
    keyValueDelimiter: ' ',
    keyValueHeader: '',
    forceQuotes: false,

    // Both
    pathSeparator: '/',
    pathSeparatorEncoded: '>',
};
