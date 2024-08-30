const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the request
const requestSchema = new Schema({
    to: {
        type: String,
        // Add required if this field is necessary
    },
    from: {
        type: String,
        default: 'Abhyudaya',
    },
    quan: {
        type: String,
        // Ensure quantity is positive
    // Add required if this field is necessary
    },
    prod: {
        type: String,
        // Add required if this field is necessary
    },
    stage: {
        type: String,
        // Add default value if necessary
    },
    estimate_time: {
    type: String,
    
},

}); // Automatically add createdAt and updatedAt fields

// Create the model from the schema
const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
