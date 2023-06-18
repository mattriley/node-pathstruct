const test = require('node:test');
const assert = require('node:assert/strict');
const parse = require('../../src/parse');

test('unquoted literal true is converted to boolean true', () => {
    const struct = parse('foo=true');
    assert.equal(struct.foo, true);
});

test('quoted literal true remains string', () => {
    const struct = parse('foo="true"');
    assert.equal(struct.foo, 'true');
});

// test('unquoted literal true is converted to boolean true within object', () => {
//     const struct = parse('x.foo=true', { select: 'foo' });
//     assert.equal(struct, true);
// });


test('unquoted literal false is converted to boolean false', () => {
    const struct = parse('foo=false');
    assert.equal(struct.foo, false);
});

test('unquoted literal false remains string', () => {
    const struct = parse('foo="false"');
    assert.equal(struct.foo, 'false');
});
