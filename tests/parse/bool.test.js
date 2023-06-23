const test = require('node:test');
const assert = require('node:assert/strict');

module.exports = ({ parse }) => {

    test('boolean true', () => {
        const expected = true;
        assert.equal(parse('foo=true').foo, expected);
        assert.equal(parse('foo=[true]').foo[0], expected);
        assert.equal(parse('x.foo=true').x.foo, expected);
        assert.equal(parse('x.foo=[true]').x.foo[0], expected);
    });

    test('string true', () => {
        const expected = 'true';
        assert.equal(parse('foo="true"').foo, expected);
        assert.equal(parse('foo=["true"]').foo[0], expected);
        assert.equal(parse('x.foo="true"').x.foo, expected);
        assert.equal(parse('x.foo=["true"]').x.foo[0], expected);
    });

    test('boolean false', () => {
        const expected = false;
        assert.equal(parse('foo=false').foo, expected);
        assert.equal(parse('foo=[false]').foo[0], expected);
        assert.equal(parse('x.foo=false').x.foo, expected);
        assert.equal(parse('x.foo=[false]').x.foo[0], expected);
    });

    test('string false', () => {
        const expected = 'false';
        assert.equal(parse('foo="false"').foo, expected);
        assert.equal(parse('foo=["false"]').foo[0], expected);
        assert.equal(parse('x.foo="false"').x.foo, expected);
        assert.equal(parse('x.foo=["false"]').x.foo[0], expected);
    });

};
