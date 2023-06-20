const defaultConfig = require('./default-config');
const modules = require('./modules');
const composer = require('module-composer');
require('module-composer/extensions/access-modifiers');

module.exports = ({ config }) => {

    const { configure } = composer(modules);
    const { compose } = configure(defaultConfig, config);

    compose('parser');
    return compose.end();

};
