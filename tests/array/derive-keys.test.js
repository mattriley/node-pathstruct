module.exports = ({ test, assert }) => ({ array }) => {

    test('derive from plural', () => {
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

    test('derive from singular', () => {
        const actual = array.deriveKeys(['subject', 'sub']);
        const expected = [
            'subject', 'sub',
            'subjects', 'subs',
            'subject+', 'sub+',
            'subjects+', 'subs+',
            'subject-', 'sub-',
            'subjects-', 'subs-'
        ];
        assert.equal(actual[0], 'subject');
        assert.deepEqual(actual, expected);
    });

};
