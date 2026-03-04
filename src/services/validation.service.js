function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateRequiredFields(fields, body) {
    for (const field of fields) {
        if (!body[field]) {
            return { isValid: false, message: `${field} is required` };
        }
    }
    return { isValid: true };
}

module.exports = {
    validateEmail,
    validateRequiredFields
};
