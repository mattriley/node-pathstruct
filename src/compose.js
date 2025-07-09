const _ = require('lodash');
const $ = require('1up');
const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config');

module.exports = ({ config } = {}) => {

    const { compose } = composer(modules, { config, defaultConfig });
    const { parser } = compose('parser', { $, _ });
    const { stringifier } = compose('stringifier', { $, _ });

    return compose('api', { parser, stringifier });

};
