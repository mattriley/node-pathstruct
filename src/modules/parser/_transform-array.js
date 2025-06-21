// Optimised on 21 June 2025 with help from ChatGPT.

module.exports = ({ self }) => arr => {

    const result = [];

    for (let i = 0; i < arr.length; i++) {
        const transformed = self.transformValue(arr[i]);
        if (transformed !== undefined) {
            result.push(transformed);
        }
    }

    return result.length > 0 ? result : undefined;

};
