const test = require('node:test');
const assert = require('node:assert/strict');

module.exports = ({ parser }) => {

    const { parse } = parser;

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
        assert.deepEqual(parse('foo="" baz=[] x.foo="" x.baz=[]'), undefined);
    });

};
