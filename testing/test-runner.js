const path = require('path');
const process = require('process');
const pathstruct = require('../src/main');
const testFiles = process.argv.slice(2);
const testModules = testFiles.map(f => require(path.resolve(f)));
testModules.forEach(run => run(pathstruct));
