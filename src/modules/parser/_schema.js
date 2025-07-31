module.exports = () => {
    return {
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

};
