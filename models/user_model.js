const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    userPassword: {
        type: String
    },
    userPhone: {
        type: Number
    },
    userAddress: {
        type: String
    },
    userPhoto: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const user = mongoose.model("Users", userSchema);

module.exports = user;