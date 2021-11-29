const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("User", UserSchema, "User");