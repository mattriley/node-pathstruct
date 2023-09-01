const _ = require('lodash');
const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config');

module.exports = ({ config } = {}) => {

    Object.assign(globalThis, { _ });

    const { configure } = composer(modules, { publicPrefix: '<<' });
    const { compose } = configure([defaultConfig, config]);
    const { parser } = compose('parser', {});
    const { stringifier } = compose('stringifier', {});
    return compose('api', { parser, stringifier });


};
