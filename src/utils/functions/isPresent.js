const isPresent = (value) => {
    if (value.constructor === Object) {
        return Object.keys(value).length > 0;
    }

    if (value.constructor === Array) {
        return value.length > 0;
    }

    return Boolean(value);
};

export default isPresent;
