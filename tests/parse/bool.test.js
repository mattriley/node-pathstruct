const test = require('node:test');
const assert = require('node:assert/strict');
const parse = require('../../src/parse');

test('unquoted literal true is converted to boolean true', () => {
    assert.equal(parse('foo=true').foo, true);
    assert.equal(parse('x.foo=true').x.foo, true);
});

test('quoted literal true remains string', () => {
    assert.equal(parse('foo="true"').foo, 'true');
    assert.equal(parse('x.foo="true"').x.foo, 'true');
});

test('unquoted literal false is converted to boolean false', () => {
    assert.equal(parse('foo=false').foo, false);
    assert.equal(parse('x.foo=false').x.foo, false);
});

test('unquoted literal false remains string', () => {
    assert.equal(parse('foo="false"').foo, 'false');
    assert.equal(parse('x.foo="false"').x.foo, 'false');
});
