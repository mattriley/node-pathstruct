module.exports = ({ test, assert }) => ({ parse }) => {

    test('picking one of two strings', () => {
        const struct = parse('pick 1 foo=bar baz=qux', { pick: ['foo'] });
        assert.deepEqual(struct, { foo: 'bar' });
    });

    test('picking from an object', () => {
        const struct = parse('pick 2 x.foo=bar baz=qux', { pick: ['x'] });
        assert.deepEqual(struct, { x: { foo: 'bar' } });
    });

    test('cannot pick from non-plain object', () => {
        const attempt = () => parse('pick 3 foo=bar baz=qux', { select: 'foo', pick: ['foo'] });
        assert.throws(attempt, { message: 'Failed to pick; target is not a plain object' });
    });

};
