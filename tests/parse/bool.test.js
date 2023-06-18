const test = require('node:test');
const assert = require('node:assert/strict');
const parse = require('../../src/parse');

test('unquoted literal true is converted to boolean true', () => {
    assert.equal(parse('foo=true').foo, true);
    assert.equal(parse('foo=[true]').foo[0], true);
    assert.equal(parse('x.foo=true').x.foo, true);
    assert.equal(parse('x.foo=[true]').x.foo[0], true);
});

test('quoted literal true remains string', () => {
    assert.equal(parse('foo="true"').foo, 'true');
    assert.equal(parse('foo=["true"]').foo[0], 'true');
    assert.equal(parse('x.foo="true"').x.foo, 'true');
    assert.equal(parse('x.foo=["true"]').x.foo[0], 'true');
});

test('unquoted literal false is converted to boolean false', () => {
    assert.equal(parse('foo=false').foo, false);
    assert.equal(parse('foo=[false]').foo[0], false);
    assert.equal(parse('x.foo=false').x.foo, false);
    assert.equal(parse('x.foo=[false]').x.foo[0], false);
});

test('unquoted literal false remains string', () => {
    assert.equal(parse('foo="false"').foo, 'false');
    assert.equal(parse('foo=["false"]').foo[0], 'false');
    assert.equal(parse('x.foo="false"').x.foo, 'false');
    assert.equal(parse('x.foo=["false"]').x.foo[0], 'false');
});
