const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [ 'user', 'admin' ],
        default: 'user',
    },
    otp:{
        type: Number,
        required: true
    },
    otpExpiry:{
        type: Date,
    },
    isVerified:{
        type: Boolean,
        default: false
    }
}, { timestamps: true })


const userModel = mongoose.model("user", userSchema)


module.exports = userModel;