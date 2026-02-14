const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    userPhone: {
        type: Number
    },
    userAddress: {
        type: String
    }
})

const user = mongoose.model("Users", userSchema);

module.exports = user;