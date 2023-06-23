const test = require('node:test');
const assert = require('node:assert/strict');

module.exports = ({ stringify }) => {

    test('empty', () => {
        const expected = '';
        assert.equal(stringify({}), expected);
        assert.equal(stringify({ x: {} }), expected);
        assert.equal(stringify({ foo: ' ', bar: '', baz: null, qux: undefined }), expected);
        assert.equal(stringify({ x: { foo: ' ', bar: '', baz: null, qux: undefined } }), expected);
        assert.equal(stringify({ foo: [], bar: [''], baz: [null], qux: [undefined] }), expected);
    });

};
