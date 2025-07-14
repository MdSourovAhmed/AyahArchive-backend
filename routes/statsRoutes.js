const express = require('express');
const router = express.Router();
const Verse = require('../models/Verse');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res, next) => {
  try {
    const verses = await Verse.find({ userId: req.user.id });
    const total = verses.length;
    const memorized = verses.filter((v) => v.status === 'memorized').length;
    const inProgress = total - memorized;

    const books = [...new Set(verses.map((v) => v.book))];
    const bookCounts = books.map((book) => ({
      book,
      count: verses.filter((v) => v.book === book).length,
    }));

    res.json({
      total,
      memorized,
      inProgress,
      books,
      bookCounts: bookCounts.map((b) => b.count),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;