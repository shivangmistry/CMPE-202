const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cardno: { type: String, default: "" },
    cvv: { type: String, default: "" },
    amount: { type: String, default: "0.00" }
});

const User = mongoose.model('user', userSchema);

module.exports = User;