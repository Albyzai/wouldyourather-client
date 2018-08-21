const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const DilemmaShema = new Schema({
  title: {
    type: String
  },
  red: {
    type: String,
    required: true
  },
  blue: {
    type: String,
    required: true
  },
  red_votes: {
    type: Number,
    default: 0,
    required: true
  },
  blue_votes: {
    type: Number,
    default: 0,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Dilemma = mongoose.model('dilemma', DilemmaShema);