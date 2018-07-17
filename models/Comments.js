const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  symbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    required: true
  },
  downvotes: {
    type: Number,
    requried: true
  },
  commentdate: {
    type: String,
    required: true
  }
});

module.exports = Comment = mongoose.model('comment', CommentSchema);

