const readerTests = require('./parse');
const writerTests = require('./stringify');
const lib = require('../src/main');

const tests = [...Object.values(readerTests), ...Object.values(writerTests)];

tests.forEach(func => {
    func(lib);
});
