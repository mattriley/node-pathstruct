const _ = require('lodash');
const defaultConfig = require('./default-config');
const modules = require('./modules');
const composer = require('module-composer');
require('module-composer/extensions/access-modifiers');

module.exports = ({ config }) => {

    Object.assign(globalThis, { _ });

    const { configure } = composer(modules);
    const { compose } = configure(defaultConfig, config);

    const { parsers } = compose('parsers');
    compose('parser', { parsers });
    return compose.end();

};