const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    campsite_id: {
        type: Schema.Types.ObjectId,
        ref: 'Campsite',
        required: true
    },
    checkin_date: {
        type: Date,
        required: true
    },
    checkout_date: {
        type: Date,
        required: true
    },
    total_amount: {
        type: mongoose.Decimal128,
        required: true
    },
    booking_status: {
        type: String,
        enum: ['Confirmed', 'Pending', 'Cancelled'],
        default: 'Pending'
    },
    payment_status: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;