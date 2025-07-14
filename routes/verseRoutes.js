// const express = require('express');
// const router = express.Router();
// const Verse = require('../models/Verse');
// const auth = require('../middleware/auth');

// // GET all verses for the authenticated user
// router.get('/', auth, async (req, res, next) => {
//   try {
//     const verses = await Verse.find({ userId: req.user.id });
//     res.json(verses);
//   } catch (err) {
//     next(err);
//   }
// });

// // POST a new verse
// router.post('/', auth, async (req, res, next) => {
//   const { book, chapter, verseRange, text, theme } = req.body;
//   try {
//     const newVerse = new Verse({
//       userId: req.user.id,
//       book,
//       chapter,
//       verseRange,
//       text,
//       theme: theme || [],
//       status: 'in-progress',
//     });
//     await newVerse.save();
//     res.status(201).json(newVerse);
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid data' });
//     next(err);
//   }
// });

// // PUT update a verse
// router.put('/:id', auth, async (req, res, next) => {
//   const { book, chapter, verseRange, text, theme, status } = req.body;
//   try {
//     const verse = await Verse.findOne({ _id: req.params.id, userId: req.user.id });
//     if (!verse) return res.status(404).json({ message: 'Verse not found' });

//     verse.book = book || verse.book;
//     verse.chapter = chapter || verse.chapter;
//     verse.verseRange = verseRange || verse.verseRange;
//     verse.text = text || verse.text;
//     verse.theme = theme || verse.theme;
//     verse.status = status || verse.status;
//     await verse.save();
//     res.json(verse);
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid data' });
//     next(err);
//   }
// });

// // DELETE a verse
// router.delete('/:id', auth, async (req, res, next) => {
//   try {
//     const verse = await Verse.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
//     if (!verse) return res.status(404).json({ message: 'Verse not found' });
//     res.json({ message: 'Verse deleted' });
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Verse = require('../models/Verse');
// const auth = require('../middleware/auth');

// // GET all verses for the authenticated user
// router.get('/', auth, async (req, res, next) => {
//   try {
//     const verses = await Verse.find({ userId: req.user.id });
//     res.json(verses);
//   } catch (err) {
//     next(err);
//   }
// });

// // POST a new verse
// router.post('/', auth, async (req, res, next) => {
//   const { book, chapter, verseRange, text, theme } = req.body;
//   try {
//     const newVerse = new Verse({
//       userId: req.user.id,
//       book,
//       chapter,
//       verseRange,
//       text,
//       theme: theme || [],
//       status: 'in-progress',
//     });
//     await newVerse.save();
//     res.status(201).json(newVerse);
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid data' });
//     next(err);
//   }
// });

// // PUT update a verse
// router.put('/:id', auth, async (req, res, next) => {
//   const { book, chapter, verseRange, text, theme, status } = req.body;
//   try {
//     const verse = await Verse.findOne({ _id: req.params.id, userId: req.user.id });
//     if (!verse) return res.status(404).json({ message: 'Verse not found' });

//     verse.book = book || verse.book;
//     verse.chapter = chapter || verse.chapter;
//     verse.verseRange = verseRange || verse.verseRange;
//     verse.text = text || verse.text;
//     verse.theme = theme || verse.theme;
//     verse.status = status || verse.status;
//     await verse.save();
//     res.json(verse);
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid data' });
//     next(err);
//   }
// });

// // DELETE a verse
// router.delete('/:id', auth, async (req, res, next) => {
//   try {
//     const verse = await Verse.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
//     if (!verse) return res.status(404).json({ message: 'Verse not found' });
//     res.json({ message: 'Verse deleted' });
//   } catch (err) {
//     next(err);
//   }
// });

// // GET chapters and their verse ranges
// router.get('/chapters', auth, async (req, res, next) => {
//   try {
//     const chapters = await Verse.aggregate([
//       { $match: { userId: req.user.id } },
//       { $group: { _id: '$chapter', verseRanges: { $addToSet: '$verseRange' } } },
//       { $sort: { _id: 1 } },
//       { $project: { chapter: '$_id', verseRanges: 1, _id: 0 } }
//     ]);
//     res.json(chapters);
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Verse = require('../models/Verse');
const auth = require('../middleware/auth');

// GET all verses for the authenticated user
router.get('/', auth, async (req, res, next) => {
  try {
    const verses = await Verse.find({ userId: req.user.id });
    res.json(verses);
  } catch (err) {
    next(err);
  }
});

// POST a new verse
router.post('/', auth, async (req, res, next) => {
  const { book, chapter, verseRange, text, theme, status } = req.body;
  try {
    if (!['in-progress', 'memorized'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    const newVerse = new Verse({
      userId: req.user.id,
      book,
      chapter,
      verseRange,
      text,
      theme: theme || [],
      status,
    });
    await newVerse.save();
    res.status(201).json(newVerse);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
    next(err);
  }
});

// PUT update a verse
router.put('/:id', auth, async (req, res, next) => {
  const { book, chapter, verseRange, text, theme, status } = req.body;
  try {
    const verse = await Verse.findOne({ _id: req.params.id, userId: req.user.id });
    if (!verse) return res.status(404).json({ message: 'Verse not found' });

    verse.book = book || verse.book;
    verse.chapter = chapter || verse.chapter;
    verse.verseRange = verseRange || verse.verseRange;
    verse.text = text || verse.text;
    verse.theme = theme || verse.theme;
    verse.status = status || verse.status;
    await verse.save();
    res.json(verse);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
    next(err);
  }
});

// DELETE a verse
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const verse = await Verse.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!verse) return res.status(404).json({ message: 'Verse not found' });
    res.json({ message: 'Verse deleted' });
  } catch (err) {
    next(err);
  }
});

// GET chapters and their verse ranges
router.get('/chapters', auth, async (req, res, next) => {
  try {
    const chapters = await Verse.aggregate([
      { $match: { userId: req.user.id } },
      { $group: { _id: '$chapter', verseRanges: { $addToSet: '$verseRange' } } },
      { $sort: { _id: 1 } },
      { $project: { chapter: '$_id', verseRanges: 1, _id: 0 } }
    ]);
    res.json(chapters);
  } catch (err) {
    next(err);
  }
});

module.exports = router;