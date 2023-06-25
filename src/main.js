const compose = require('./compose');
const { modules } = compose({});
module.exports = { ...modules.parser, ...modules.stringifier };
