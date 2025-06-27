module.exports = ({ test, assert }) => ({ parse }) => {

    test('boolean true', () => {
        const expected = true;
        assert.equal(parse('bool 1 foo=true').foo, expected);
        assert.equal(parse('bool 2 foo=[true]').foo[0], expected);
        assert.equal(parse('bool 3 x.foo=true').x.foo, expected);
        assert.equal(parse('bool 4 x.foo=[true]').x.foo[0], expected);
    });

    test('string true', () => {
        const expected = 'true';
        assert.equal(parse('bool 5 foo="true"').foo, expected);
        assert.equal(parse('bool 6 foo=["true"]').foo[0], expected);
        assert.equal(parse('bool 7 x.foo="true"').x.foo, expected);
        assert.equal(parse('bool 8 x.foo=["true"]').x.foo[0], expected);
    });

    test('boolean false', () => {
        const expected = false;
        assert.equal(parse('bool 9 foo=false').foo, expected);
        assert.equal(parse('bool 10 foo=[false]').foo[0], expected);
        assert.equal(parse('bool 11 x.foo=false').x.foo, expected);
        assert.equal(parse('bool 12 x.foo=[false]').x.foo[0], expected);
    });

    test('string false', () => {
        const expected = 'false';
        assert.equal(parse('bool 13 foo="false"').foo, expected);
        assert.equal(parse('bool 14 foo=["false"]').foo[0], expected);
        assert.equal(parse('bool 15 x.foo="false"').x.foo, expected);
        assert.equal(parse('bool 16 x.foo=["false"]').x.foo[0], expected);
    });

};
