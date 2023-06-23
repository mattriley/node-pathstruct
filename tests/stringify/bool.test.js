const test = require('node:test');
const assert = require('node:assert/strict');

module.exports = ({ stringify }) => {

    test('boolean true', () => {
        assert.equal(stringify({ foo: true }), 'foo=true');
        assert.equal(stringify({ foo: [true] }), 'foo=[true]');
        assert.equal(stringify({ x: { foo: true } }), 'x.foo=true');
        assert.equal(stringify({ x: { foo: [true] } }), 'x.foo=[true]');
    });

    test('string true', () => {
        assert.equal(stringify({ foo: 'true' }), 'foo="true"');
        assert.equal(stringify({ foo: ['true'] }), 'foo=["true"]');
        assert.equal(stringify({ x: { foo: 'true' } }), 'x.foo="true"');
        assert.equal(stringify({ x: { foo: ['true'] } }), 'x.foo=["true"]');
    });

    // test('boolean false', () => {
    //     const expected = false;
    //     assert.equal(stringify('foo=false').foo, expected);
    //     assert.equal(stringify('foo=[false]').foo[0], expected);
    //     assert.equal(stringify('x.foo=false').x.foo, expected);
    //     assert.equal(stringify('x.foo=[false]').x.foo[0], expected);
    // });

    // test('string false', () => {
    //     const expected = 'false';
    //     assert.equal(stringify('foo="false"').foo, expected);
    //     assert.equal(stringify('foo=["false"]').foo[0], expected);
    //     assert.equal(stringify('x.foo="false"').x.foo, expected);
    //     assert.equal(stringify('x.foo=["false"]').x.foo[0], expected);
    // });

};
