const test = require('node:test');
const assert = require('node:assert/strict');

module.exports = ({ parse }) => {



    test('empty', () => {
        const expected = { foo: undefined, baz: 'qux' };
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
        assert.deepEqual(parse(''), undefined);
        assert.deepEqual(parse('foo'), undefined);
        assert.deepEqual(parse('foo/bar'), undefined);
        assert.deepEqual(parse('foo="" x.foo=""'), undefined);
        assert.deepEqual(parse('baz=[] x.foo=[]'), undefined);
    });

};
