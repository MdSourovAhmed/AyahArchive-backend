const express = require('express');
const router = express.Router();
const Verse = require('../models/Verse');
const auth = require('../middleware/auth');
const { generateQuizQuestion } = require('../utils/quizGenerator');

router.get('/', auth, async (req, res, next) => {
  try {
    const verses = await Verse.find({ userId: req.user.id });
    if (verses.length === 0) {
      return res.status(404).json({ message: 'No verses found for quiz' });
    }
    const question = generateQuizQuestion(verses);
    res.json(question);
  } catch (err) {
    next(err);
  }
});

router.post('/answer', auth, async (req, res, next) => {
  const { questionId, answer } = req.body;
  try {
    const verse = await Verse.findById(questionId);
    if (!verse) {
      return res.status(404).json({ message: 'Question not found' });
    }
    const correct = answer.trim().toLowerCase() === verse.text.trim().toLowerCase();
    res.json({ correct });
  } catch (err) {
    next(err);
  }
});

module.exports = router;