const Ajv = require('ajv/dist/2020');

module.exports = ({ self }) => {

    console.warn(self.schema)

    const ajv = new Ajv();
    const validate = ajv.compile(self.schema);

    return data => {
        const valid = validate(data);
        return { valid, errors: validate.errors };
    };

};
