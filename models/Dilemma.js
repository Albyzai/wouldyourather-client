const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const Comment = require('./Comment');
mongoose.plugin(slug);

let dilemmaSchemaOptions = {
  toJSON: {
    virtuals: true
  }
};

// Create Schema
const DilemmaSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String
    },
    prefix: {
      type: String
    },
    slug: {
      type: String,
      slug: 'title'
    },
    red: {
      type: String,
      required: true
    },
    blue: {
      type: String,
      required: true
    },
    red_votes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
      }
    ],
    blue_votes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
      }
    ],
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
  },
  dilemmaSchemaOptions
);

let totalVotesVirtual = DilemmaSchema.virtual('total_votes');
let redVotesVirtual = DilemmaSchema.virtual('red_votes_count');
let blueVotesVirtual = DilemmaSchema.virtual('blue_votes_count');

redVotesVirtual.get(function() {
  return this.red_votes.length;
});

blueVotesVirtual.get(function() {
  return this.blue_votes.length;
});

totalVotesVirtual.get(function() {
  return this.red_votes.length + this.blue_votes.length;
});

// dilemmaSchemaVirtual.get(() => {
//   return this.red_votes;
// });

// dilemmaSchemaVirtual.get(function() {
//   return this.blue + ' ' + this.red;
// });
// dilemmaSchemaVirtual.set((red) => {
//   return this.red_votes;
// });

module.exports = Dilemma = mongoose.model('Dilemma', DilemmaSchema, 'dilemmas');
