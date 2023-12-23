const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
    trim: true,
  },
  content: {
    required: true,
    type: String,
     },
  author: {
    required: true,
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  },
});

const post = mongoose.model("Post", postSchema);

module.exports = post;
