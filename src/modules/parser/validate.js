const Ajv = require('ajv/dist/2020');

const schema = {
    type: 'object',
    properties: {
        path: {
            type: 'string'
        },
        options: {
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
