module.exports = ({ test, assert }) => ({ parse }) => {

    test('selecting a string', () => {
        const struct = parse('foo=bar baz=qux', { select: 'foo' });
        assert.deepEqual(struct, 'bar');
    });

    test('selecting an object', () => {
        const struct = parse('x.foo=bar y.baz=qux', { select: 'x' });
        assert.deepEqual(struct, { foo: 'bar' });
    });

    test('parsing an object into existing object', () => {
        const initial = { foo: 'bar' };
        const struct = parse('x.baz=qux', { initial, select: 'x' });
        assert.deepEqual(struct, { foo: 'bar', baz: 'qux' });
    });

};
