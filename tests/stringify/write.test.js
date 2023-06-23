const test = require('node:test');
const assert = require('node:assert/strict');

module.exports = ({ stringify }) => {

    test('stringify a value', () => {
        const path = stringify({ foo: 'bar' });
        assert.deepEqual(path, 'foo=bar');
    });

};
