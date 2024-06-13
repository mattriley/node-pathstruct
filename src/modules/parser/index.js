module.exports = {
    '<< parse': require('./<< parse'),
    applyAliases: require('./apply-aliases'),
    applyOperators: require('./apply-operators'),
    invokeParsers: require('./invoke-parsers'),
    parseArray: require('./parse-array'),
    parseObject: require('./parse-object'),
    transformArray: require('./transform-array'),
    transformObject: require('./transform-object'),
    transformValue: require('./transform-value'),
    validate: require('./validate')
};
