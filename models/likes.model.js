const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  liked: {
    type: Boolean,
    default: true, // true for "like," false for "dislike"
  },
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;