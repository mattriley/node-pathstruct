const test = require('node:test');
const assert = require('node:assert/strict');

module.exports = ({ stringify }) => {

    test('validation', () => {
        assert.throws(() => stringify());
    });

};
