module.exports = ({ test, assert }) => ({ array }) => {

    test('append and remove', () => {
        const obj = { sub: ['a', 'b'], 'sub+': ['c'], 'sub-': ['a'] };
        const keys = array.deriveKeys(['sub']);
        const actual = array.apply(obj, keys);
        const expected = { sub: ['b', 'c'] };
        assert.deepEqual(actual, expected);
        assert.equal(actual['sub+'], undefined);
        assert.equal(actual['sub-'], undefined);
    });

    test('append and remove with different keys', () => {
        const obj = { sub: ['a', 'b'], 'subject+': ['c'], 'sub-': ['a'] };
        const keys = array.deriveKeys(['sub', 'subject']);
        const actual = array.apply(obj, keys);
        const expected = { sub: ['b', 'c'] };
        assert.deepEqual(actual, expected);
        assert.equal(actual['sub+'], undefined);
        assert.equal(actual['sub-'], undefined);
    });

    test('result uses first key', () => {
        const obj = { sub: ['a', 'b'] };
        const keys = array.deriveKeys(['subjects', 'sub']);
        const actual = array.apply(obj, keys);
        const expected = { subjects: ['a', 'b'] };
        assert.deepEqual(actual, expected);
    });

    test('result is sorted', () => {
        const obj = { sub: ['b', 'a'] };
        const keys = array.deriveKeys(['sub']);
        const actual = array.apply(obj, keys);
        const expected = { sub: ['a', 'b'] };
        assert.deepEqual(actual, expected);
    });

};
