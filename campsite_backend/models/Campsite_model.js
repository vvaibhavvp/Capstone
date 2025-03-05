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
        required: true,
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: "Amount must be greater than 0."
        }
    },
    amenities: {
        type: String,
        default: ''
    },
    image: {
        type: [String],
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required : true
    },
    tags: [{
        type: String,
        enum: ['Pet-Friendly', 'Mountain-View', 'Lake-Side', 'Family-Friendly', 'Romentic']
    }],
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return this.start_date < value;
            },
            message: "End date must be after start date."
        }
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

// ✅ Use ES6 export
export const Campsite = mongoose.model("Campsite", CampsiteSchema);
