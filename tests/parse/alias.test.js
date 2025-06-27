module.exports = ({ test, assert }) => ({ parse }) => {

    test('alias', () => {
        const aliases = { foo: ['f'] };
        const struct = parse('alias 1 f=[bar]', { aliases });
        assert.deepEqual(struct, { 'foo': ['bar'] });
    });

    test('alias override', () => {
        const aliases = { foo: ['f'] };
        const struct = parse('alias 2 foo=[bar] f=[baz]', { aliases });
        assert.deepEqual(struct, { 'foo': ['baz'] });
    });

    test('alias with object', () => {
        const aliases = { foo: ['f'] };
        const options = { select: 'p', aliases };
        const struct = parse('alias 3 p.f=[bar]', options);
        assert.deepEqual(struct, { 'foo': ['bar'] });
    });

};
