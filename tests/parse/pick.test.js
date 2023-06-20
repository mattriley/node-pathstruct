const test = require('node:test');
const assert = require('node:assert/strict');

module.exports = ({ parse }) => {



    test('picking one of two strings', () => {
        const struct = parse('foo=bar baz=qux', { pick: 'foo' });
        assert.deepEqual(struct, { foo: 'bar' });
    });

    test('picking an object', () => {
        const struct = parse('x.foo=bar', { pick: ['x'] });
        assert.deepEqual(struct, { x: { foo: 'bar' } });
    });

};
