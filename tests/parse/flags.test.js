module.exports = ({ test, assert }) => ({ parser }) => {

    test('flags', () => {
        const parse = parser.configure({ markers: { '@': 'flags' } });
        const struct = parse('@foo @bar');
        assert.deepEqual(struct, { flags: ['foo', 'bar'] });
    });

    test('flags nested', () => {
        const parse = parser.configure({ markers: { '@': 'f.flags' } });
        const struct = parse('@foo @bar');
        assert.deepEqual(struct, { f: { flags: ['foo', 'bar'] } });
    });

    test('flags single is string instead of array', () => {
        const parse = parser.configure({ markers: { '@': 'flags' } });
        const struct = parse('@foo');
        assert.deepEqual(struct, { flags: 'foo' });
    });

};
