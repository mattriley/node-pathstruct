module.exports = ({ test, assert }) => ({ array }) => {

    test('apply keys', () => {
        const obj = { sub: ['foo', 'bar'], 'sub+': ['baz'], 'sub-': ['foo'] };
        const actual = array.apply(obj, ['subjects', 'sub']);
        const expected = { subjects: ['bar', 'baz'] };
        assert.deepEqual(actual, expected);
        assert.equal(actual['sub+'], undefined);
        assert.equal(actual['sub-'], undefined);
    });

};
