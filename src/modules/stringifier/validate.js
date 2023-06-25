const Ajv = require('ajv/dist/2020');

const schema = {
    type: 'object',
    properties: {
        obj: {
            type: 'object'
        },
        options: {
            type: 'object',
            properties: {
                pick: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                }
            }
        }
    }
};

const ajv = new Ajv();
const validate = ajv.compile(schema);

module.exports = () => data => {
    const valid = validate(data);
    return { valid, errors: validate.errors };
};
