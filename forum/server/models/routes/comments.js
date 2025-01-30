const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

// Получить все комментарии
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ timestamp: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Добавить новый комментарий
router.post('/', async (req, res) => {
  const { nickname, message } = req.body;
  const comment = new Comment({ nickname, message });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;