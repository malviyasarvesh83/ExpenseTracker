const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    status: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;