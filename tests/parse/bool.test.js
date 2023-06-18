const test = require('node:test');
const assert = require('node:assert/strict');
const parse = require('../../src/parse');

test('string value is literal true', () => {
    const struct = parse('foo=true', { select: 'foo' });
    assert.equal(struct, true);
});

test('string value is literal false', () => {
    // this only works when using select
    const struct = parse('foo=false', { select: 'foo' });
    assert.equal(struct, false);
});
