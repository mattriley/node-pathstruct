module.exports = ({ test, assert }) => ({ parse }) => {

    test('adding a string to an existing struct', () => {
        const initial = { foo: 'bar' };
        const struct = parse('baz=qux', { initial });
        assert.deepEqual(struct, { foo: 'bar', baz: 'qux' });
    });

    test('adding a string to a sub-object of an existing struct', () => {
        const initial = { x: { foo: 'bar' } };
        const struct = parse('x.baz=qux', { initial });
        assert.deepEqual(struct, { x: { foo: 'bar', baz: 'qux' } });
    });

    test('removing a string from an existing struct', () => {
        const initial = { foo: 'bar', baz: 'qux' };
        const struct = parse('baz=""', { initial });
        assert.deepEqual(struct, { foo: 'bar', baz: undefined });
    });

    test('removing a string from a sub-object of an existing struct', () => {
        const initial = { x: { foo: 'bar', baz: 'qux' } };
        const struct = parse('x.baz=""', { initial });
        assert.deepEqual(struct, { x: { foo: 'bar', baz: undefined } });
    });

    test('initial boolean remains boolean', () => {
        const initial = { bool: true };
        const struct = parse('', { initial });
        assert.deepEqual(struct, { bool: true });
    });

    test('changing an array', () => {
        const initial = { x: { arr: ['foo', 'bar'] } };
        const struct = parse('x.arr=[baz]', { initial });
        assert.deepEqual(struct, { x: { arr: ['baz'] } });
    });

    test('initial has array but incoming is a string', () => {
        const initial = { arr: ['foo'] };
        const struct = parse('arr=bar', { initial });
        assert.deepEqual(struct, { arr: ['bar'] });
    });

};
