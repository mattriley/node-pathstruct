module.exports = () => (objValue, srcValue) => {
    if (Array.isArray(objValue)) return [srcValue].flat();
};
