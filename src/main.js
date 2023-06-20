const compose = require('./compose');
const { modules } = compose({});
const { parserCore } = modules;
module.exports = { ...parserCore };
