const test = require('node:test');
const assert = require('node:assert/strict');

module.exports = ({ parse }) => {

    test('picking one of two strings', () => {
        const struct = parse('foo=bar baz=qux', { pick: ['foo'] });
        assert.deepEqual(struct, { foo: 'bar' });
    });

    test('picking from an object', () => {
        const struct = parse('x.foo=bar baz=qux', { pick: ['x'] });
        assert.deepEqual(struct, { x: { foo: 'bar' } });
    });

    test('cannot pick from non-plain object', () => {
        const attempt = () => parse('foo=bar baz=qux', { select: 'foo', pick: ['foo'] });
        assert.throws(attempt, { message: 'Failed to pick; target is not a plain object' });
    });

};
