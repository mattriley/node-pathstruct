module.exports = ({ test, assert }) => ({ parse }) => {

    test('parsing a string', () => {
        const struct = parse('foo=bar');
        assert.deepEqual(struct, { foo: 'bar' });
    });

    test('parsing a string with a single quote', () => {
        const struct = parse('foo=ba\'r');
        assert.deepEqual(struct, { foo: 'ba\'r' });
    });

    test('parsing a string with an extension', () => {
        const struct = parse('foo=bar.jpg');
        assert.deepEqual(struct, { foo: 'bar' });
    });

    test('parsing two strings', () => {
        const struct = parse('foo=bar baz=qux');
        assert.deepEqual(struct, { foo: 'bar', baz: 'qux' });
    });

    test('parsing quoted string with spaces', () => {
        const struct = parse('foo="bar bar"');
        assert.deepEqual(struct, { foo: 'bar bar' });
    });

    test('parsing an array of string', () => {
        const struct = parse('foo=[bar,baz]');
        assert.deepEqual(struct, { foo: ['bar', 'baz'] });
    });

    test('parsing an array of string containing spaces', () => {
        const struct = parse('foo=[bar bar,baz baz]');
        assert.deepEqual(struct, { foo: ['bar bar', 'baz baz'] });
    });

    test('parsing an array of string with surrounding spaces are trimmed', () => {
        const struct = parse('foo=[ bar , baz ]');
        assert.deepEqual(struct, { foo: ['bar', 'baz'] });
    });

    test('parsing an object with a string', () => {
        const struct = parse('x.foo=bar');
        assert.deepEqual(struct, { x: { foo: 'bar' } });
    });

    test('parsing an object with an array', () => {
        const struct = parse('x.foo=[bar,baz]');
        assert.deepEqual(struct, { x: { foo: ['bar', 'baz'] } });
    });

    test('scalar to nested', () => {
        const struct = parse('x="abc" x.foo=bar');
        assert.deepEqual(struct, { x: { value: 'abc', foo: 'bar' } });
    });

    test('scalar to nested subdirectory', () => {
        const struct = parse('x.foo=bar/x=abc');
        assert.deepEqual(struct, { x: { value: 'abc', foo: 'bar' } });
    });

};
