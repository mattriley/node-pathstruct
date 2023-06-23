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
        const path = stringify({ foo: ['bar', 'baz'] });
        assert.deepEqual(path, 'foo=[bar,baz]');
    });

    test('stringify an array with spaces', () => {
        const path = stringify({ foo: ['bar bar', 'baz baz'] });
        assert.deepEqual(path, 'foo=[bar bar,baz baz]');
    });

    test('stringify an object', () => {
        const path = stringify({ x: { foo: 'bar' } });
        assert.deepEqual(path, 'x.foo=bar');
    });

    test('stringify a combination', () => {
        const path = stringify({ foo: 'bar', baz: ['qux'], x: { foo: 'bar' } });
        assert.deepEqual(path, 'foo=bar baz=[qux] x.foo=bar');
    });

    test('forward slash converted to underscore', () => {
        const path = stringify({ foo: 'bar/baz', bar: ['baz/baz'] });
        assert.deepEqual(path, 'foo=bar_baz bar=[baz_baz]');
    });

};
