module.exports = ({ test, assert }) => ({ parse }) => {

    test('parsing an array of string', () => {
        const struct = parse('foo=[bar,baz]');
        assert.deepEqual(struct, { foo: ['bar', 'baz'] });
    });

    test('parsing an array of string containing spaces', () => {
        const struct = parse('foo=[bar bar,baz baz]');
        assert.deepEqual(struct, { foo: ['bar bar', 'baz baz'] });
    });

    test('parsing an array of string with surrounding spaces', () => {
        const struct = parse('foo=[ bar , baz ]');
        assert.deepEqual(struct, { foo: ['bar', 'baz'] });
    });

    test('parsing an object with an array', () => {
        const struct = parse('x.foo=[bar,baz]');
        assert.deepEqual(struct, { x: { foo: ['bar', 'baz'] } });
    });

};
