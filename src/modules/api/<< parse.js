module.exports = ({ parser }) => (path, options = {}) => {

    const defaultOptions = { select: undefined, pick: [], cache: {}, initial: {} };
    return parser.parse(path, { ...defaultOptions, ...options });

};
