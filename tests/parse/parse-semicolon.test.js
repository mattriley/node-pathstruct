module.exports = ({ test, assert }) => ({ parse }) => {

    test('parsing terminated string', () => {
        const struct = parse('foo=bar;');
        assert.deepEqual(struct, { foo: 'bar' });
    });

    test('parsing terminated string containing space', () => {
        const struct = parse('foo=bar bar;');
        assert.deepEqual(struct, { foo: 'bar bar' });
    });

    test('parsing quoted string with spaces containing terminator', () => {
        const struct = parse('foo="bar;bar"');
        assert.deepEqual(struct, { foo: 'bar;bar' });
    });

};
