module.exports = ({ test, assert }) => ({ parse }) => {

    test('overriding an object with a string', () => {
        const struct = parse('x.foo=foo x.foo=bar');
        assert.deepEqual(struct, { x: { foo: 'bar' } });
    });

    test('force overriding an object with a string', () => {
        const struct = parse('x!foo=foo x.foo=bar');
        assert.deepEqual(struct, { x: { foo: 'foo' } });
    });

    test('force overriding an object with a string at parent directory', () => {
        const struct = parse('x!foo=foo/x.foo=bar');
        assert.deepEqual(struct, { x: { foo: 'foo' } });
    });

    test('force overriding an array with a string at parent directory', () => {
        const struct = parse('x!foo=[a]/x.foo=[b]');
        assert.deepEqual(struct, { x: { foo: ['a'] } });
    });

};
