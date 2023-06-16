const test = require('node:test');
const assert = require('node:assert/strict');
const parse = require('../src/parse');

test('parsing string', () => {
    const struct = parse('foo=bar', { pick: ['foo'] });
    assert.deepEqual(struct, { foo: 'bar' });
});

test('parsing multiple strings', () => {
    const struct = parse('foo=bar baz=qux', { pick: ['foo', 'baz'] });
    assert.deepEqual(struct, { foo: 'bar', baz: 'qux' });
});

test('parsing quoted string with spaces', () => {
    const struct = parse('foo="bar baz"', { pick: ['foo'] });
    assert.deepEqual(struct, { foo: 'bar baz' });
});

test('parsing array', () => {
    const struct = parse('foo=[bar,baz]', { pick: ['foo'] });
    assert.deepEqual(struct, { foo: ['bar', 'baz'] });
});

test('parsing array with values with spaces', () => {
    const struct = parse('foo=[a b,c d]', { pick: ['foo'] });
    assert.deepEqual(struct, { foo: ['a b', 'c d'] });
});

test('overriding', () => {
    const struct = parse('foo=bar/foo=baz', { pick: ['foo'] });
    assert.deepEqual(struct, { foo: 'baz' });
});
