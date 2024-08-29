const mongoose=require('mongoose');
const eventSchema = new mongoose.Schema({
    ogName: String,
    loc: String,
    date: String,
    time: String,
    dur: String, // Change this to String
    fund: Number,
    fundCollect: {
      type: Number,
      default: 0
    },    
    vol: Number,
  });
  
  const Event = mongoose.model('Event', eventSchema);
  
  module.exports = Event;