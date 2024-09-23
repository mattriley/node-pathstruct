module.exports = ({ test, assert }) => ({ stringify }) => {

    test('stringify a value', () => {
        const path = stringify({ foo: 'bar' });
        assert.deepEqual(path, 'foo=bar');
    });

    test('stringify two values', () => {
        const path = stringify({ foo: 'bar', baz: 'qux' });
        assert.deepEqual(path, 'foo=bar baz=qux');
    });

    test('stringify a value with a space', () => {
        const path = stringify({ foo: 'bar bar' });
        assert.deepEqual(path, 'foo="bar bar"');
    });

    test('stringify an array', () => {
        const path = stringify({ foo: ['bar', 'baz'] });
        assert.deepEqual(path, 'foo=[bar,baz]');
    });

    test('stringify an array with spaces', () => {
        const path = stringify({ foo: ['bar bar', 'baz baz'] });
        assert.deepEqual(path, 'foo=[bar bar,baz baz]');
    });

    test('stringify an object', () => {
        const path = stringify({ x: { foo: 'bar' } });
        assert.deepEqual(path, 'x.foo=bar');
    });

    test('stringify an object with array value', () => {
        const path = stringify({ x: { foo: ['bar'] } });
        assert.deepEqual(path, 'x.foo=[bar]');
    });

    test('stringify a combination', () => {
        const path = stringify({ foo: 'bar', baz: ['qux'], x: { foo: 'bar' } });
        assert.deepEqual(path, 'foo=bar baz=[qux] x.foo=bar');
    });

    test('forward slash encoded', () => {
        const path = stringify({ foo: 'bar/baz', bar: ['baz/baz'] });
        assert.deepEqual(path, 'foo=bar>baz bar=[baz>baz]');
    });

    test('option to limit keys', () => {
        const path = stringify({ foo: 'bar', baz: 'qux' }, { pick: ['foo'] });
        assert.deepEqual(path, 'foo=bar');
    });

    test('option to limit keys not found', () => {
        const path = stringify({ foo: 'bar' }, { pick: ['baz'] });
        assert.deepEqual(path, '');
    });

};
