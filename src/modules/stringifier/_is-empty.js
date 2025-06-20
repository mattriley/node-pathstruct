const isEmpty = val => {

    const checks = [
        () => val === null,
        () => val === undefined,
        () => Array.isArray(val) && val.every(isEmpty),
        () => val.toString().trim().length === 0
    ];

    return checks.some(check => check());

};

module.exports = () => isEmpty;
