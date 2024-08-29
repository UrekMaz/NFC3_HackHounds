const mongoose = require('mongoose');

const pastSchema = new mongoose.Schema({
    ogName: String,
    loc: String,
    date: String,
    time: String,
    dur: {
        value: Number, // The duration value
        unit: String   // The duration unit (e.g., hours, days)
    },
    fundCollect: {
        type: Number,
        default: 0
    },
    vol: {
        type: Number,
        default: 0
    },
    image_src:String,
});

const Past = mongoose.model('Past', pastSchema);

module.exports = Past;