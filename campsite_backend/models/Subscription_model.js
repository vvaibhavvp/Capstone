const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscription_plan: {
        type: String,
        required: true
    },
    discount_rate: {
        type: Schema.Types.Decimal128,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    subscription_status: {
        type: String,
        enum: ['Active', 'Expired'],
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
module.exports = Subscription;