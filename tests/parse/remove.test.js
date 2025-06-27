module.exports = ({ test, assert }) => ({ parse }) => {

    test('removing a string from an existing struct', () => {
        const initial = { foo: 'bar', baz: 'qux' };
        const struct = parse('baz=""/1.jpg', { initial });
        assert.deepEqual(struct, { foo: 'bar', baz: null });
    });

    test('removing a string from a sub-object of an existing struct', () => {
        const initial = { x: { foo: 'bar', baz: 'qux' } };
        const struct = parse('x.baz=""/1.jpg', { initial });
        assert.deepEqual(struct, { x: { foo: 'bar', baz: null } });
    });

    test('removing a string from a sub-object of an existing struct using empty array', () => {
        const initial = { x: { foo: 'bar', baz: ['qux'] } };
        const struct = parse('x.baz=[]/1.jpg', { initial });
        assert.deepEqual(struct, { x: { foo: 'bar', baz: null } });
    });

};
