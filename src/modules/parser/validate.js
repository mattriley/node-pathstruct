const Ajv = require("ajv");

const schema = {
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
};

const ajv = new Ajv();
const validate = ajv.compile(schema);

module.exports = () => data => {
    const valid = validate(data);
    return { valid, errors: validate.errors };
};
