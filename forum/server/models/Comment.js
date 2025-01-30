const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);