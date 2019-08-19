const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    email: { type: String },
    item: { type: String },
    time: { type: String }
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;