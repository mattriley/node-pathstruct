const test = require('node:test');
const assert = require('node:assert/strict');

const parse = require('../src/parse');



test('synchronous passing test', () => {
    const struct = parse('foo=bar', { pick: ['foo'], default: { err: true } });
    assert.deepEqual(struct, { foo: 'bar' });
});
