const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: '/default-avatar.jpg'
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  dilemmas: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Dilemma'
    }
  ],
  completed_dilemmas: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Dilemma'
    }
  ]
});

module.exports = User = mongoose.model('User', UserSchema, 'users');
