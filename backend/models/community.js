const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    user_id: {
        type:String, // Assuming you have a User model
        required: true
    },
    user_name: {
        type:String, // Assuming you have a User model
        required: false
    },
    time: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        
    },
    event_id: {
        type:String, // Assuming you have an Event model
        
    },
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;