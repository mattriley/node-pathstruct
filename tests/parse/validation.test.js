const test = require('node:test');
const assert = require('node:assert/strict');

module.exports = ({ parse }) => {

    test('validation', () => {
        assert.throws(() => parse());
    });

};
