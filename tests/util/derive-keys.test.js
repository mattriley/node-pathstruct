module.exports = ({ test, assert }) => ({ array }) => {

    test('derive keys', () => {
        const actual = array.deriveKeys(['subjects', 'subs']);
        const expected = [
            'subjects', 'subs',
            'subject', 'sub',
            'subjects+', 'subs+',
            'subject+', 'sub+',
            'subjects-', 'subs-',
            'subject-', 'sub-'
        ];
        assert.equal(actual[0], 'subjects');
        assert.deepEqual(actual, expected);
    });

};
