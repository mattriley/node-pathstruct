module.exports = ({ test, assert }) => ({ parse }) => {

    test('omit one of two strings', () => {
        const struct = parse('omit 1 foo=bar baz=qux', { omit: ['foo'] });
        assert.deepEqual(struct, { baz: 'qux' });
    });

    test('omit from an object', () => {
        const struct = parse('pick 2 x.foo=bar baz=qux', { omit: ['x'] });
        assert.deepEqual(struct, { baz: 'qux' });
    });

    test('cannot pick from non-plain object', () => {
        const attempt = () => parse('omit 3 foo=bar baz=qux', { select: 'foo', omit: ['foo'] });
        assert.throws(attempt, { message: 'Failed to omit; target is not a plain object' });
    });

};
