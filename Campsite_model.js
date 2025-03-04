import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CampsiteSchema = new Schema({
    campsite_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
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
        required: true
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

// ✅ Use ES6 export
export const Campsite = mongoose.model("Campsite", CampsiteSchema);
