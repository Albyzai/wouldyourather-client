const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Dilemma = require('./Dilemma');
// Create Schema
const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dilemma: {
    type: Schema.Types.ObjectId,
    ref: 'Dilemma',
    required: true
  },
  author: {
    type: String,
    default: 'Slettet bruger',
    required: true
  },
  commentpicture: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: []
    }
  ]
});

CommentSchema.add({
  replies: [CommentSchema]
});

module.exports = Comment = mongoose.model('Comment', CommentSchema, 'comments');
