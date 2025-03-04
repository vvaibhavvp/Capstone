const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    city_name: {
        type: String,
        required: true
    },
    state_id: {
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true
    }
});

const City = mongoose.model('City', CitySchema);
module.exports = City;