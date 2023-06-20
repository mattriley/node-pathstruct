const test = require('node:test');
const assert = require('node:assert/strict');

module.exports = ({ parse }) => {




    test('adding a string to an existing struct', () => {
        const initial = { foo: 'bar' };
        const struct = parse('baz=qux', { initial });
        assert.deepEqual(struct, { foo: 'bar', baz: 'qux' });
    });

    test('adding a string to a sub-object of an existing struct', () => {
        const initial = { x: { foo: 'bar' } };
        const struct = parse('x.baz=qux', { initial });
        assert.deepEqual(struct, { x: { foo: 'bar', baz: 'qux' } });
    });

    test('removing a string from an existing struct', () => {
        const initial = { foo: 'bar', baz: 'qux' };
        const struct = parse('baz=""', { initial });
        assert.deepEqual(struct, { foo: 'bar', baz: undefined });
    });

    test('removing a string from a sub-object of an existing struct', () => {
        const initial = { x: { foo: 'bar', baz: 'qux' } };
        const struct = parse('x.baz=""', { initial });
        assert.deepEqual(struct, { x: { foo: 'bar', baz: undefined } });
    });

};
