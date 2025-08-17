// const express = require('express');
// const router = express.Router();
// const Verse = require('../models/Verse');
// const auth = require('../middleware/auth');

// router.get('/', auth, async (req, res, next) => {
//   try {
//     const verses = await Verse.find({ userId: req.user.id });
//     const total = verses.length;
//     const memorized = verses.filter((v) => v.status === 'memorized').length;
//     const inProgress = total - memorized;

//     const books = [...new Set(verses.map((v) => v.book))];
//     const bookCounts = books.map((book) => ({
//       book,
//       count: verses.filter((v) => v.book === book).length,
//     }));

//     res.json({
//       total,
//       memorized,
//       inProgress,
//       books,
//       bookCounts: bookCounts.map((b) => b.count),
//     });
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

// router.get('/', auth, async (req, res, next) => {
//   try {
//     const verses = await Verse.find({ userId: req.user.id });
//     const total = verses.length;
//     const memorized = verses.filter(v => v.status === 'memorized').length;
//     const inProgress = total - memorized;

//     const chapters = [...new Set(verses.map(v => v.surahNumber))];
//     const chapterCounts = chapters.map(chapter => ({
//       chapter,
//       count: verses.filter(v => v.surahNumber === chapter).length
//     }));

//     res.json({
//       total,
//       memorized,
//       inProgress,
//       chapters,
//       chapterCounts: chapterCounts.map(c => c.count)
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Verse = require('../models/Verse');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res, next) => {
  try {
    const verses = await Verse.find({ userId: req.user.id }).populate('surahId', 'surahNumber');
    const total = verses.length;
    const memorized = verses.filter(v => v.status === 'memorized').length;
    const inProgress = total - memorized;

    const chapters = [...new Set(verses.map(v => v.surahId.surahNumber))];
    const chapterCounts = chapters.map(chapter => ({
      chapter,
      count: verses.filter(v => v.surahId.surahNumber === chapter).length
    }));

    res.json({
      total,
      memorized,
      inProgress,
      chapters,
      chapterCounts: chapterCounts.map(c => c.count)
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;