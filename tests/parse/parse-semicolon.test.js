module.exports = ({ test, assert }) => ({ parse }) => {

    test('parsing quoted string with spaces including semicolon', () => {
        const struct = parse('foo="bar;bar"');
        assert.deepEqual(struct, { foo: 'bar;bar' });
    });

    test('parsing terminated string without spaces', () => {
        const struct = parse('foo=bar;');
        assert.deepEqual(struct, { foo: 'bar' });
    });

    test('parsing terminated string with spaces', () => {
        const struct = parse('foo=bar bar;');
        assert.deepEqual(struct, { foo: 'bar bar' });
    });


};
