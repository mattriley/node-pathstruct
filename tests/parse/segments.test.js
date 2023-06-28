module.exports = ({ test, assert }) => ({ parse }) => {

    test('overriding a string over two path segments', () => {
        const struct = parse('foo=bar/foo=baz');
        assert.deepEqual(struct, { foo: 'baz' });
    });

    test('parsing an object over two path segments', () => {
        const struct = parse('x.foo=bar/x.baz=qux');
        assert.deepEqual(struct, { x: { foo: 'bar', baz: 'qux' } });
    });

    test('overriding an object over two path segments', () => {
        const struct = parse('x.foo=bar/x.foo=baz');
        assert.deepEqual(struct, { x: { foo: 'baz' } });
    });

};
