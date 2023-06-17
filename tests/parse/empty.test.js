const test = require('node:test');
const assert = require('node:assert/strict');
const parse = require('../../src/parse');

// if all empty, entire is considered empty...

test('parsing an empty string', () => {
    const struct = parse('foo="" baz=qux');
    assert.deepEqual(struct, { foo: undefined, baz: 'qux' });
});

test('parsing an empty array', () => {
    const struct = parse('foo=[] baz=qux');
    assert.deepEqual(struct, { foo: undefined, baz: 'qux' });
});

test('parsing an empty string on an object', () => {
    const struct = parse('x.foo="" x.baz=qux');
    assert.deepEqual(struct, { x: { foo: undefined, baz: 'qux' } });
});

test('parsing an empty array on an object', () => {
    const struct = parse('x.foo=[] x.baz=qux');
    assert.deepEqual(struct, { x: { foo: undefined, baz: 'qux' } });
});

