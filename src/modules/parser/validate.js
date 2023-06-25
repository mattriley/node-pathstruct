const Ajv = require('ajv/dist/2020');

const schema = {
    type: 'array',
    prefixItems: [
        {
            type: 'string'
        },
        {
            type: 'object',
            properties: {
                initial: {
                    type: 'object'
                },
                select: {
                    type: 'string'
                },
                pick: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                },
                cache: {
                    type: 'object'
                },
                additionalProperties: false
            }
        }
    ]
};

const ajv = new Ajv();
const validate = ajv.compile(schema);

module.exports = () => (...args) => {
    const valid = validate(args);
    return { valid, errors: validate.errors };
};
