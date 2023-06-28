module.exports = ({ test, assert }) => ({ stringify }) => {

    test('empty', () => {
        const expected = '';
        assert.equal(stringify({}), expected);
        assert.equal(stringify({ x: {} }), expected);
        assert.equal(stringify({ foo: ' ', bar: '', baz: null, qux: undefined }), expected);
        assert.equal(stringify({ x: { foo: ' ', bar: '', baz: null, qux: undefined } }), expected);
        assert.equal(stringify({ foo: [], bar: [''], baz: [null], qux: [undefined] }), expected);
    });

};
