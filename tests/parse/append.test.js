module.exports = ({ test, assert }) => ({ parse }) => {

    test('append', () => {
        const initial = { foo: ['bar'] };
        const struct = parse('append 1 foo+=[baz]', { initial });
        assert.deepEqual(struct, { 'foo': ['bar', 'baz'] });
    });

    test('append without target', () => {
        const initial = {};
        const struct = parse('append 2 foo+=[baz]', { initial });
        assert.deepEqual(struct, { 'foo': ['baz'] });
    });

    test('append runs last', () => {
        const initial = {};
        const struct = parse('append 3 foo+=[baz] foo=[bar]', { initial });
        assert.deepEqual(struct, { 'foo': ['bar', 'baz'] });
    });

    test('append to non-array', () => {
        const initial = {};
        const struct = parse('append 4 foo+=[baz] foo=bar', { initial });
        assert.deepEqual(struct, { 'foo': ['bar', 'baz'] });
    });

    test('remove', () => {
        const initial = { foo: ['bar', 'baz'] };
        const struct = parse('append 5 foo-=[baz]', { initial });
        assert.deepEqual(struct, { 'foo': ['bar'] });
    });

    test('remove without target', () => {
        const initial = {};
        const struct = parse('append 6 foo-=[baz]', { initial });
        assert.deepEqual(struct, null);
    });

    test('remove runs last', () => {
        const initial = {};
        const struct = parse('append 7 foo-=[baz] foo=[bar,baz]', { initial });
        assert.deepEqual(struct, { 'foo': ['bar'] });
    });

};
