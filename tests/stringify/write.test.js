const test = require('node:test');
const assert = require('node:assert/strict');

module.exports = ({ stringify }) => {

    test('stringify a value', () => {
        const path = stringify({ foo: 'bar' });
        assert.deepEqual(path, 'foo=bar');
    });

    test('stringify two values', () => {
        const path = stringify({ foo: 'bar', baz: 'qux' });
        assert.deepEqual(path, 'foo=bar baz=qux');
    });

    test('stringify a value with a space', () => {
        const path = stringify({ foo: 'bar bar' });
        assert.deepEqual(path, 'foo="bar bar"');
    });

    test('stringify an array', () => {
        const path = stringify({ foo: ['bar', 'bar'] });
        assert.deepEqual(path, 'foo=[bar,bar]');
    });

};
