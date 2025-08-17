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


//Last
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
//   const { book, chapter, verseRange, text, theme, status } = req.body;
//   try {
//     if (!['in-progress', 'memorized'].includes(status)) {
//       return res.status(400).json({ message: 'Invalid status value' });
//     }
//     const newVerse = new Verse({
//       userId: req.user.id,
//       book,
//       chapter,
//       verseRange,
//       text,
//       theme: theme || [],
//       status,
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



//Last
// const express = require('express');
// const router = express.Router();
// const Verse = require('../models/Verse');
// const QuranVerse = require('../models/QuranVerse');
// const auth = require('../middleware/auth');

// // GET all user verses by status
// router.get('/', auth, async (req, res, next) => {
//   try {
//     const { status } = req.query;
//     const query = { userId: req.user.id };
//     if (status) query.status = status;
//     const verses = await Verse.find(query).sort({ surahNumber: 1 });
//     res.json(verses);
//   } catch (err) {
//     next(err);
//   }
// });

// // POST add a verse range
// router.post('/add', auth, async (req, res, next) => {
//   const { surahNumber, surahName, verseRange, status } = req.body;
//   try {
//     // Validate surah
//     const surah = await QuranVerse.findOne({ surahNumber, surahNameEnglish: surahName });
//     if (!surah) return res.status(404).json({ message: 'Surah not found' });

//     // Validate verse range
//     const [start, end] = verseRange.split('-').map(Number);
//     const totalVerses = await QuranVerse.countDocuments({ surahNumber });
//     if (start < 1 || end > totalVerses || start > end) {
//       return res.status(400).json({ message: 'Invalid verse range' });
//     }

//     const verse = new Verse({
//       userId: req.user.id,
//       surahNumber,
//       verseRange,
//       status: status || 'in-progress'
//     });
//     await verse.save();
//     res.status(201).json(verse);
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid data' });
//     next(err);
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Verse = require('../models/Verse');
// const Surah = require('../models/Surah');
// const QuranVerse = require('../models/QuranVerse');
// const auth = require('../middleware/auth');

// // GET all user verses by status
// router.get('/', auth, async (req, res, next) => {
//   try {
//     const { status } = req.query;
//     const query = { userId: req.user.id };
//     if (status) query.status = status;
//     const verses = await Verse.find(query)
//       .populate('surahId', 'surahNumber surahNameArabic surahNameEnglish')
//       .sort({ 'surahId.surahNumber': 1 });
//     res.json(verses);
//   } catch (err) {
//     next(err);
//   }
// });

// // POST add a verse range
// router.post('/add', auth, async (req, res, next) => {
//   const { surahNumber, surahName, verseRange, status } = req.body;
//   try {
//     // Validate surah
//     const surah = await Surah.findOne({ surahNumber, surahNameEnglish: surahName });
//     if (!surah) return res.status(404).json({ message: 'Surah not found' });

//     // Validate verse range
//     const [start, end] = verseRange.split('-').map(Number);
//     const totalVerses = surah.totalVerses;
//     if (start < 1 || end > totalVerses || start > end) {
//       return res.status(400).json({ message: 'Invalid verse range' });
//     }

//     const verse = new Verse({
//       userId: req.user.id,
//       surahId: surah._id,
//       verseRange,
//       status: status || 'in-progress'
//     });
//     await verse.save();
//     const populatedVerse = await Verse.findById(verse._id).populate('surahId', 'surahNumber surahNameArabic surahNameEnglish');
//     res.status(201).json(populatedVerse);
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid data' });
//     next(err);
//   }
// });

// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const Verse = require('../models/Verse');
// const Surah = require('../models/Surah');
// const auth = require('../middleware/auth');

// // GET all user verses by status
// router.get('/', auth, async (req, res, next) => {
//   try {
//     const { status } = req.query;
//     const query = { userId: req.user.id };
//     if (status) query.status = status;
//     const verses = await Verse.find(query)
//       .populate('surahId', 'surahNumber surahNameArabic surahNameEnglish totalVerses')
//       .sort({ 'surahId.surahNumber': 1 });
//     res.json(verses);
//   } catch (err) {
//     next(err);
//   }
// });

// // POST add a verse range
// router.post('/add', auth, async (req, res, next) => {
//   const { surahNumber, surahName, verseRange, status } = req.body;
//   try {
//     // Validate surah
//     const surah = await Surah.findOne({ surahNumber, surahNameEnglish: surahName });
//     if (!surah) return res.status(404).json({ message: 'Surah not found' });

//     // Validate verse range
//     const [start, end] = verseRange.split('-').map(Number);
//     const totalVerses = surah.totalVerses;
//     if (start < 1 || end > totalVerses || start > end) {
//       return res.status(400).json({ message: 'Invalid verse range' });
//     }

//     const verse = new Verse({
//       userId: req.user.id,
//       surahId: surah._id,
//       verseRange,
//       status: status || 'in-progress'
//     });
//     await verse.save();
//     const populatedVerse = await Verse.findById(verse._id).populate('surahId', 'surahNumber surahNameArabic surahNameEnglish totalVerses');
//     res.status(201).json(populatedVerse);
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid data' });
//     next(err);
//   }
// });

// // PUT update a verse range
// router.put('/:id', auth, async (req, res, next) => {
//   const { surahNumber, surahName, verseRange, status } = req.body;
//   try {
//     const verse = await Verse.findOne({ _id: req.params.id, userId: req.user.id });
//     if (!verse) return res.status(404).json({ message: 'Verse range not found' });

//     // Validate surah if provided
//     let surah = verse.surahId;
//     if (surahNumber && surahName) {
//       surah = await Surah.findOne({ surahNumber, surahNameEnglish: surahName });
//       if (!surah) return res.status(404).json({ message: 'Surah not found' });
//       verse.surahId = surah._id;
//     }

//     // Validate verse range if provided
//     if (verseRange) {
//       const [start, end] = verseRange.split('-').map(Number);
//       const totalVerses = (await Surah.findById(verse.surahId)).totalVerses;
//       if (start < 1 || end > totalVerses || start > end) {
//         return res.status(400).json({ message: 'Invalid verse range' });
//       }
//       verse.verseRange = verseRange;
//     }

//     // Update status if provided
//     if (status) verse.status = status;

//     await verse.save();
//     const populatedVerse = await Verse.findById(verse._id).populate('surahId', 'surahNumber surahNameArabic surahNameEnglish totalVerses');
//     res.json(populatedVerse);
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid data' });
//     next(err);
//   }
// });

// // DELETE a verse range
// router.delete('/:id', auth, async (req, res, next) => {
//   try {
//     const verse = await Verse.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
//     if (!verse) return res.status(404).json({ message: 'Verse range not found' });
//     res.json({ message: 'Verse range deleted successfully' });
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;





const express = require('express');
const router = express.Router();
const Verse = require('../models/Verse');
const Surah = require('../models/Surah');
const auth = require('../middleware/auth');

// GET all user verses by status
router.get('/', auth, async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = { userId: req.user.id };
    if (status) query.status = status;
    const verses = await Verse.find(query)
      .populate('surahId', 'surahNumber surahNameArabic surahNameEnglish totalVerses')
      .sort({ 'surahId.surahNumber': 1 });
    res.json(verses);
  } catch (err) {
    next(err);
  }
});

// POST add a verse range
router.post('/add', auth, async (req, res, next) => {
  const { surahNumber, surahName, verseRange, status } = req.body;
  try {
    // Validate input
    if (!surahNumber || !surahName || !verseRange || !status) {
      return res.status(400).json({ message: 'Missing required fields: surahNumber, surahName, verseRange, status' });
    }

    // Validate surah
    const surah = await Surah.findOne({ surahNumber: parseInt(surahNumber), surahNameEnglish: surahName });
    if (!surah) return res.status(404).json({ message: `Surah not found: ${surahNumber} - ${surahName}` });

    // Validate verse range
    const rangeRegex = /^\d+-\d+$/;
    if (!rangeRegex.test(verseRange)) {
      return res.status(400).json({ message: 'Invalid verse range format. Use "start-end" (e.g., "1-5")' });
    }
    const [start, end] = verseRange.split('-').map(Number);
    const totalVerses = surah.totalVerses;
    if (isNaN(start) || isNaN(end) || start < 1 || end > totalVerses || start > end) {
      return res.status(400).json({ message: `Invalid verse range: ${verseRange}. Must be between 1 and ${totalVerses}` });
    }

    // Validate status
    if (!['in-progress', 'memorized'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be "in-progress" or "memorized"' });
    }

    const verse = new Verse({
      userId: req.user.id,
      surahId: surah._id,
      verseRange,
      status
    });
    await verse.save();
    const populatedVerse = await Verse.findById(verse._id).populate('surahId', 'surahNumber surahNameArabic surahNameEnglish totalVerses');
    res.status(201).json(populatedVerse);
  } catch (err) {
    console.error('Error adding verse:', err);
    res.status(400).json({ message: 'Failed to add verse range', error: err.message });
    next(err);
  }
});

// PUT update a verse range
router.put('/:id', auth, async (req, res, next) => {
  const { surahNumber, surahName, verseRange, status } = req.body;
  try {
    const verse = await Verse.findOne({ _id: req.params.id, userId: req.user.id });
    if (!verse) return res.status(404).json({ message: 'Verse range not found' });

    // Validate surah if provided
    let surah = await Surah.findById(verse.surahId);
    if (surahNumber && surahName) {
      surah = await Surah.findOne({ surahNumber: parseInt(surahNumber), surahNameEnglish: surahName });
      if (!surah) return res.status(404).json({ message: `Surah not found: ${surahNumber} - ${surahName}` });
      verse.surahId = surah._id;
    }

    // Validate verse range if provided
    if (verseRange) {
      const rangeRegex = /^\d+-\d+$/;
      if (!rangeRegex.test(verseRange)) {
        return res.status(400).json({ message: 'Invalid verse range format. Use "start-end" (e.g., "1-5")' });
      }
      const [start, end] = verseRange.split('-').map(Number);
      const totalVerses = surah.totalVerses;
      if (isNaN(start) || isNaN(end) || start < 1 || end > totalVerses || start > end) {
        return res.status(400).json({ message: `Invalid verse range: ${verseRange}. Must be between 1 and ${totalVerses}` });
      }
      verse.verseRange = verseRange;
    }

    // Update status if provided
    if (status) {
      if (!['in-progress', 'memorized'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be "in-progress" or "memorized"' });
      }
      verse.status = status;
    }

    await verse.save();
    const populatedVerse = await Verse.findById(verse._id).populate('surahId', 'surahNumber surahNameArabic surahNameEnglish totalVerses');
    res.json(populatedVerse);
  } catch (err) {
    console.error('Error updating verse:', err);
    res.status(400).json({ message: 'Failed to update verse range', error: err.message });
    next(err);
  }
});

// DELETE a verse range
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const verse = await Verse.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!verse) return res.status(404).json({ message: 'Verse range not found' });
    res.json({ message: 'Verse range deleted successfully' });
  } catch (err) {
    console.error('Error deleting verse:', err);
    res.status(400).json({ message: 'Failed to delete verse range', error: err.message });
    next(err);
  }
});

module.exports = router;