const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateSchema = new Schema({
    state_name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const State = mongoose.model('State', StateSchema);
module.exports = State;