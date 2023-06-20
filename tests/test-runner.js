const tests = require('./parse');
const lib = require('../src/main');

Object.values(tests).forEach(func => {
    func(lib);
});
