const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampsiteSchema = new Schema({
    campsite_name: {
    type : String,
    require: true
    },
    description: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city_id: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    state_id: {
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true
    },
    amount: {
        type: mongoose.Decimal128,
        required: true
    },
    amenities: {
        type: String
    },
    image: {
        type: String,
        require: true
    },
    availability: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const Campsite = mongoose.model('Campsite', CampsiteSchema);
module.exports = Campsite;