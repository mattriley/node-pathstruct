const test = require('node:test');
const assert = require('node:assert/strict');
const parse = require('../src/parse');

test('parsing a string', () => {
    const struct = parse('foo=bar');
    assert.deepEqual(struct, { foo: 'bar' });
});

test('parsing two strings', () => {
    const struct = parse('foo=bar baz=qux');
    assert.deepEqual(struct, { foo: 'bar', baz: 'qux' });
});

test('picking one of two strings', () => {
    const struct = parse('foo=bar baz=qux', { pick: 'foo' });
    assert.deepEqual(struct, { foo: 'bar' });
});

test('selecting a string', () => {
    const struct = parse('foo=bar baz=qux', { select: 'foo' });
    assert.deepEqual(struct, 'bar');
});

test('parsing an empty string', () => {
    const struct = parse('foo="" baz=qux');
    assert.deepEqual(struct, { foo: undefined, baz: 'qux' });
});

test('parsing quoted string with spaces', () => {
    const struct = parse('foo="bar bar"');
    assert.deepEqual(struct, { foo: 'bar bar' });
});

test('parsing an array of string', () => {
    const struct = parse('foo=[bar,baz]');
    assert.deepEqual(struct, { foo: ['bar', 'baz'] });
});

test('parsing an array of string containing spaces', () => {
    const struct = parse('foo=[bar bar,baz baz]');
    assert.deepEqual(struct, { foo: ['bar bar', 'baz baz'] });
});

test('overriding a string', () => {
    const struct = parse('foo=bar/foo=baz');
    assert.deepEqual(struct, { foo: 'baz' });
});

test('adding a string to an existing struct', () => {
    const initial = { foo: 'bar' };
    const struct = parse('baz=qux', { initial });
    assert.deepEqual(struct, { foo: 'bar', baz: 'qux' });
});

test('removing a string from an existing struct', () => {
    const initial = { foo: 'bar', baz: 'qux' };
    const struct = parse('baz=""', { initial });
    assert.deepEqual(struct, { foo: 'bar', baz: undefined });
});
