module.exports = ({ test, assert }) => ({ parse }) => {

    test('selecting a string', () => {
        const struct = parse('select 1 foo=bar baz=qux', { select: 'foo' });
        assert.deepEqual(struct, 'bar');
    });

    test('selecting an object', () => {
        const struct = parse('select 2 x.foo=bar y.baz=qux', { select: 'x' });
        assert.deepEqual(struct, { foo: 'bar' });
    });

    test('parsing an object into existing object', () => {
        const initial = { foo: 'bar' };
        const struct = parse('select 3 x.baz=qux', { initial, select: 'x' });
        assert.deepEqual(struct, { foo: 'bar', baz: 'qux' });
    });

};
