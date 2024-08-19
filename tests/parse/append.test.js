module.exports = ({ test, assert }) => ({ parse }) => {

    test('append', () => {
        const initial = { foo: ['bar'] };
        const struct = parse('foo+=[baz]', { initial });
        assert.deepEqual(struct, { 'foo': ['bar', 'baz'] });
    });

    test('append without target', () => {
        const initial = {};
        const struct = parse('foo+=[baz]', { initial });
        assert.deepEqual(struct, { 'foo': ['baz'] });
    });

    test('append runs last', () => {
        const initial = {};
        const struct = parse('foo+=[baz] foo=[bar]', { initial });
        assert.deepEqual(struct, { 'foo': ['bar', 'baz'] });
    });

    test('append to non-array', () => {
        const initial = {};
        const struct = parse('foo+=[baz] foo=bar', { initial });
        assert.deepEqual(struct, { 'foo': ['bar', 'baz'] });
    });

    test('remove', () => {
        const initial = { foo: ['bar', 'baz'] };
        const struct = parse('foo-=[baz]', { initial });
        assert.deepEqual(struct, { 'foo': ['bar'] });
    });

    test('remove without target', () => {
        const initial = {};
        const struct = parse('foo-=[baz]', { initial });
        assert.deepEqual(struct, undefined);
    });

    test('remove runs last', () => {
        const initial = {};
        const struct = parse('foo-=[baz] foo=[bar,baz]', { initial });
        assert.deepEqual(struct, { 'foo': ['bar'] });
    });

};
