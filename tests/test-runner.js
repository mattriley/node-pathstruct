const tests = require('./parse');
const compose = require('../src/compose');

const { modules } = compose({});

Object.values(tests).forEach(func => {
    func(modules);
});
