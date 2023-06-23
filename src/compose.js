const _ = require('lodash');
const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config');
require('module-composer/extensions/access-modifiers');

module.exports = ({ config }) => {

    Object.assign(globalThis, { _ });

    const { configure } = composer(modules, { publicPrefix: '<<' });
    const { compose } = configure(defaultConfig, config);
    const { util } = compose('util');
    const { reader } = compose('reader');
    const { writer } = compose('writer', { util });
    compose('api', { reader, writer });
    return compose.end();

};
