module.exports = ({ self }) => obj => {

    const result = {};
    let hasMeaningfulValue = false;

    for (const [key, value] of Object.entries(obj)) {
        const transformed = self.transformValue(value);
        result[key] = transformed;
        if (transformed !== null) hasMeaningfulValue = true;
    }

    return hasMeaningfulValue ? result : null;

};
