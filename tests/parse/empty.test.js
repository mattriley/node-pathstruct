module.exports = ({ test, assert }) => ({ parse }) => {

    test('empty', () => {
        const expected = { foo: null, baz: 'qux' };
        assert.deepEqual(parse('foo="" baz=qux'), expected);
        assert.deepEqual(parse('foo=[] baz=qux'), expected);
        assert.deepEqual(parse('foo=[""] baz=qux'), expected);
        assert.deepEqual(parse('foo=[,] baz=qux'), expected);
        assert.deepEqual(parse('foo=["",""] baz=qux'), expected);
        assert.deepEqual(parse('x.foo="" x.baz=qux'), { x: expected });
        assert.deepEqual(parse('x.foo=[] x.baz=qux'), { x: expected });
        assert.deepEqual(parse('x.foo=[""] x.baz=qux'), { x: expected });
        assert.deepEqual(parse('x.foo=[,] x.baz=qux'), { x: expected });
        assert.deepEqual(parse('x.foo=["",""] x.baz=qux'), { x: expected });
    });

    test('empty everything', () => {
        assert.deepEqual(parse(''), null);
        assert.deepEqual(parse('foo'), null);
        assert.deepEqual(parse('foo/bar'), null);
        assert.deepEqual(parse('foo="" x.foo=""'), null);
        assert.deepEqual(parse('baz=[] x.foo=[]'), null);
    });

};
