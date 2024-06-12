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

};
