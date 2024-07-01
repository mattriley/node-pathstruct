module.exports = ({ test, assert }) => ({ parse }) => {

    test('removing a string from an existing struct', () => {
        const initial = { foo: 'bar', baz: 'qux' };
        const struct = parse('baz=""/1.jpg', { initial });
        assert.deepEqual(struct, { foo: 'bar', baz: undefined });
    });

    test('removing a string from an existing struct twice', () => {
        const initial = { foo: 'bar', baz: 'qux' };
        const struct1 = parse('baz=""/1.jpg', { initial });
        const struct2 = parse('baz=""/2.jpg', { initial });
        assert.deepEqual(struct1, { foo: 'bar', baz: undefined });
        assert.deepEqual(struct2, { foo: 'bar', baz: undefined });
    });

    test('removing a string from a sub-object of an existing struct', () => {
        const initial = { x: { foo: 'bar', baz: 'qux' } };
        const struct = parse('x.baz=""/1.jpg', { initial });
        assert.deepEqual(struct, { x: { foo: 'bar', baz: undefined } });
    });

    test('removing a string from a sub-object of an existing struct twice', () => {
        const initial = { x: { foo: 'bar', baz: 'qux' } };
        const struct1 = parse('x.baz=""/1.jpg', { initial });
        const struct2 = parse('x.baz=""/2.jpg', { initial });
        assert.deepEqual(struct1, { x: { foo: 'bar', baz: undefined } });
        assert.deepEqual(struct2, { x: { foo: 'bar', baz: undefined } });
    });

};
