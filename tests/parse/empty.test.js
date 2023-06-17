const test = require('node:test');
const assert = require('node:assert/strict');
const parse = require('../../src/parse');

test('empty string', () => {
    const struct = parse('foo="" baz=qux');
    assert.deepEqual(struct, { foo: undefined, baz: 'qux' });
});

test('empty array', () => {
    const struct = parse('foo=[] baz=qux');
    assert.deepEqual(struct, { foo: undefined, baz: 'qux' });
});

test('empty string on an object', () => {
    const struct = parse('x.foo="" x.baz=qux');
    assert.deepEqual(struct, { x: { foo: undefined, baz: 'qux' } });
});

test('empty array on an object', () => {
    const struct = parse('x.foo=[] x.baz=qux');
    assert.deepEqual(struct, { x: { foo: undefined, baz: 'qux' } });
});

test('empty everything', () => {
    const struct = parse('foo="" baz=[] x.foo="" x.baz=[]');
    assert.deepEqual(struct, undefined);
});
