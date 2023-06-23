const test = require('node:test');
const assert = require('node:assert/strict');

module.exports = ({ stringify }) => {

    test('empty', () => {
        const expected = '';
        assert.deepEqual(stringify({ foo: ' ', bar: '', baz: null, qux: undefined }), expected);
        assert.deepEqual(stringify({ x: { foo: ' ', bar: '', baz: null, qux: undefined } }), expected);
        assert.deepEqual(stringify({ foo: [], bar: [''], baz: [null], qux: [undefined] }), expected);
    });

};
