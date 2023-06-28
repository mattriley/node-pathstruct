module.exports = ({ test, assert }) => ({ parse }) => {

    test('validation', () => {
        assert.throws(() => parse());
    });

};
