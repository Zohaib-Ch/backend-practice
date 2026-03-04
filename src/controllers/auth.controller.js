const userModel = require("../models/user.model");
const authService = require("../services/auth.service");
const validationService = require("../services/validation.service");


async function registerUser(req, res) {
    const { username, email, password, role = "user" } = req.body;

    const validation = validationService.validateRequiredFields(["username", "email", "password"], req.body);
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
    }

    if (!validationService.validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserAlreadyExists) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hash = await authService.hashPassword(password);
    const otp = authService.generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role,
        otp,
        otpExpiry
    });


    const token = authService.generateToken(user);

    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }
    });
}

async function loginUser(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await authService.comparePassword(password, user.password);


    if (!isPasswordValid) {
        return res.status(401).json({ message: "Wrong Password" });
    }

    const token = authService.generateToken(user);

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }
    });
}

async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
}

module.exports = { registerUser, loginUser, logoutUser };