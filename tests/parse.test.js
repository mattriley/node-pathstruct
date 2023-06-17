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

test('overriding a string over two path segments', () => {
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

test('parsing an object with a string', () => {
    const struct = parse('x.foo=bar');
    assert.deepEqual(struct, { x: { foo: 'bar' } });
});

test('parsing an object with an array', () => {
    const struct = parse('x.foo=[bar,baz]');
    assert.deepEqual(struct, { x: { foo: ['bar', 'baz'] } });
});

test('parsing an object over two path segments', () => {
    const struct = parse('x.foo=bar/x.baz=qux');
    assert.deepEqual(struct, { x: { foo: 'bar', baz: 'qux' } });
});

test('overriding an object over two path segments', () => {
    const struct = parse('x.foo=bar/x.foo=baz');
    assert.deepEqual(struct, { x: { foo: 'baz' } });
});

test('picking an object', () => {
    const struct = parse('x.foo=bar', { pick: ['x'] });
    assert.deepEqual(struct, { x: { foo: 'bar' } });
});

test('string value is literal true', () => {
    const struct = parse('foo=true', { select: 'foo' });
    assert.equal(struct, true);
});

test('string value is literal false', () => {
    // this only works when using select
    const struct = parse('foo=false', { select: 'foo' });
    assert.equal(struct, false);
});

test('parsing an empty array', () => {
    const struct = parse('foo=[] baz=qux');
    assert.deepEqual(struct, { foo: undefined, baz: 'qux' });
});



// test('selecting an object', () => {
//     const struct = parse('x.foo=bar y.baz=qux', { select: ['x'] });
//     // console.warn(struct);
//     assert.deepEqual(struct, { foo: 'bar' });
// });

// test('parsing an object into existing object', () => {
//     const initial = { x: { foo: 'bar' } };
//     const struct = parse('x.baz=qux', { initial, select: 'x' });
//     // console.warn(struct);
//     assert.deepEqual(struct, { foo: 'bar', baz: 'qux' });
// });
