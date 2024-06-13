module.exports = ({ test, assert }) => ({ parse }) => {

    test('alias', () => {
        const aliases = { foo: ['f'] };
        const struct = parse('f=[bar]', { aliases });
        assert.deepEqual(struct, { 'foo': ['bar'] });
    });

    test('alias override', () => {
        const aliases = { foo: ['f'] };
        const struct = parse('foo=[bar] f=[baz]', { aliases });
        assert.deepEqual(struct, { 'foo': ['baz'] });
    });

};
