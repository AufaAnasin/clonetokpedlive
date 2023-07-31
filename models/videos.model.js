const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoPath: {
    type: String,
    required: true,
  },
  thumbnailPath: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },


  likes: {
    type: Number,
    default: 0,
  },
  // actual likes
//   [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Like',
//     },
//   ], 


  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // You can add more fields like upload date, video duration, etc., as needed.
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;