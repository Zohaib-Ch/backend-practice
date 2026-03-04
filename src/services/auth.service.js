const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

function generateToken(user) {
    return jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET);
}
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    generateOTP
};
