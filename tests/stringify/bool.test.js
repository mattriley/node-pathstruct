const test = require('node:test');
const assert = require('node:assert/strict');

module.exports = ({ stringify }) => {

    test('boolean true', () => {
        assert.equal(stringify({ foo: true }), 'foo=true');
        assert.equal(stringify({ foo: [true] }), 'foo=[true]');
        assert.equal(stringify({ x: { foo: true } }), 'x.foo=true');
        assert.equal(stringify({ x: { foo: [true] } }), 'x.foo=[true]');
    });

    test('string true', () => {
        assert.equal(stringify({ foo: 'true' }), 'foo="true"');
        assert.equal(stringify({ foo: ['true'] }), 'foo=["true"]');
        assert.equal(stringify({ x: { foo: 'true' } }), 'x.foo="true"');
        assert.equal(stringify({ x: { foo: ['true'] } }), 'x.foo=["true"]');
    });

    test('boolean false', () => {
        assert.equal(stringify({ foo: false }), 'foo=false');
        assert.equal(stringify({ foo: [false] }), 'foo=[false]');
        assert.equal(stringify({ x: { foo: false } }), 'x.foo=false');
        assert.equal(stringify({ x: { foo: [false] } }), 'x.foo=[false]');
    });

    test('string false', () => {
        assert.equal(stringify({ foo: 'false' }), 'foo="false"');
        assert.equal(stringify({ foo: ['false'] }), 'foo=["false"]');
        assert.equal(stringify({ x: { foo: 'false' } }), 'x.foo="false"');
        assert.equal(stringify({ x: { foo: ['false'] } }), 'x.foo=["false"]');
    });

};
