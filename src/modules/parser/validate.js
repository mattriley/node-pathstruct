const Ajv = require('ajv/dist/2020');

const schema = {
    type: 'object',
    required: ['path'],
    properties: {
        path: {
            type: 'string'
        },
        options: {
            type: 'object',
            additionalProperties: false,
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
                aliases: {
                    type: 'object'
                },
                cache: {
                    type: 'object'
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
