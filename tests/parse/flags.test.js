module.exports = ({ test, assert }) => ({ parser }) => {

    test('flags', () => {
        const parse = parser.configure({ markers: { '@': 'flags' } });
        const struct = parse('@foo @bar');
        assert.deepEqual(struct, { flags: ['foo', 'bar'] });
    });

    test('flags nested', () => {
        const parse = parser.configure({ markers: { '@': 'f.flags' } });
        const struct = parse('@foo @bar @baz');
        assert.deepEqual(struct, { f: { flags: ['foo', 'bar', 'baz'] } });
    });

    test('flags single is string instead of array', () => {
        const parse = parser.configure({ markers: { '@': 'flags' } });
        const struct = parse('@foo');
        assert.deepEqual(struct, { flags: 'foo' });
    });


    // test('x', () => {
    //     const parse = parser.configure({ markers: { '@': 'f.flags' } });
    //     const struct = parse('𝟷𝟷𝟸𝟼𝟾𝟹 @pik • 🔴 𝟸𝟶𝟸𝟻 ⫽ 𝙹𝚊𝚗 ⫽ 𝚃𝚑𝚞 𝟷𝟼 • 𝟷𝟸꞉𝟷𝟺 𝙿𝙼 📍Dazaifu 📱 iPhone 14 • p.vis=[Luna] f.id="Q1ZNVGFHGY0" • f.src="Li" 👤');
    //     assert.deepEqual(struct, { f: { flags: ['pik'] } });

    // });


};
