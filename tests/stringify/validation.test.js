module.exports = ({ test, assert }) => ({ stringify }) => {

    test('validation', () => {
        assert.throws(() => stringify());
    });

};
