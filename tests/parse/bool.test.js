const test = require('node:test');
const assert = require('node:assert/strict');
const parse = require('../../src/parse');

test('unquoted literal true is converted to boolean true', () => {
    const struct = parse('foo=true', { select: 'foo' });
    assert.equal(struct, true);
});

test('quoted literal true remains string', () => {
    const struct = parse('foo="true"', { select: 'foo' });
    assert.equal(struct, 'true');
});


test('unquoted literal false is converted to boolean false', () => {
    const struct = parse('foo=false', { select: 'foo' });
    assert.equal(struct, false);
});

test('unquoted literal false remains string', () => {
    const struct = parse('foo="false"', { select: 'foo' });
    assert.equal(struct, 'false');
});
