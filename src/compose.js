const _ = require('lodash');
const $ = require('1up');
const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config');

module.exports = ({ config } = {}) => {

    Object.assign(globalThis, { _, $ });

    const { compose } = composer(modules, { config, defaultConfig });
    const { parser } = compose('parser');
    const { stringifier } = compose('stringifier');

    return compose('api', { parser, stringifier });

};
