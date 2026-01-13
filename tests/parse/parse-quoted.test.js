module.exports = ({ test, assert }) => ({ parse }) => {

    test('parsing quoted string', () => {
        const struct = parse('foo="bar"');
        assert.deepEqual(struct, { foo: 'bar' });
    });

    test('parsing quoted string containing space', () => {
        const struct = parse('foo="bar bar"');
        assert.deepEqual(struct, { foo: 'bar bar' });
    });

};
