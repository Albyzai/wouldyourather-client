const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;

const Comment = require("./Comment");
mongoose.plugin(slug);

// Create Schema
const DilemmaSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String
  },
  prefix: {
    type: String
  },
  slug: {
    type: String,
    slug: "title"
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
  likes: [
    {
      user: {
        type: String
        // type: Schema.Types.ObjectId,
        // ref: "User"
      }
    }
  ],
  comments: [Comment.schema],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Dilemma = mongoose.model("Dilemma", DilemmaSchema, "dilemmas");
