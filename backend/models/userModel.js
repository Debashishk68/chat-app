const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profileImg: {
        type: String
    },
    dob: {
        type: Date
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
