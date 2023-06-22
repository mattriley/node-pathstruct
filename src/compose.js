const _ = require('lodash');
const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config');
require('module-composer/extensions/access-modifiers');

module.exports = ({ config }) => {

    Object.assign(globalThis, { _ });

    const { configure } = composer(modules, { publicPrefix: '<<' });
    const { compose } = configure(defaultConfig, config);
    const { parsers } = compose('parsers');
    const { parserCore } = compose('parserCore', { parsers });
    compose('api', { parserCore });
    return compose.end();

};
