module.exports = ({ test, assert }) => ({ parse }) => {

    test('parse key ending with plus for append', () => {
        const struct = parse('foo+=[bar,baz]');
        assert.deepEqual(struct, { 'foo+': ['bar', 'baz'] });
    });

    test('parse key ending with minus for remove', () => {
        const struct = parse('foo-=[bar,baz]');
        assert.deepEqual(struct, { 'foo-': ['bar', 'baz'] });
    });

};
