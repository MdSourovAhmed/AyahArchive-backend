// const express = require('express');
// const router = express.Router();
// const QuranVerse = require('../models/QuranVerse');

// // GET all chapters (surahs) with verse ranges
// router.get('/chapters', async (req, res, next) => {
//   try {
//     const chapters = await QuranVerse.aggregate([
//       {
//         $group: {
//           _id: '$surahNumber',
//           surahNameArabic: { $first: '$surahNameArabic' },
//           surahNameEnglish: { $first: '$surahNameEnglish' },
//           verseNumbers: { $push: '$verseNumber' }
//         }
//       },
//       {
//         $project: {
//           chapter: '$_id',
//           surahNameArabic: 1,
//           surahNameEnglish: 1,
//           verseRanges: {
//             $reduce: {
//               input: '$verseNumbers',
//               initialValue: [],
//               in: {
//                 $cond: {
//                   if: { $eq: ['$$this', { $arrayElemAt: ['$verseNumbers', { $subtract: [{ $size: '$verseNumbers' }, 1] }] }] },
//                   then: { $concatArrays: ['$$value', [{ start: '$$this', end: '$$this' }]] },
//                   else: {
//                     $cond: {
//                       if: { $eq: ['$$this', { $add: [{ $arrayElemAt: ['$$value', -1] }, 1] } ] },
//                       then: {
//                         $concatArrays: [
//                           { $slice: ['$$value', 0, { $subtract: [{ $size: '$$value' }, 1] }] },
//                           [{ start: { $arrayElemAt: ['$$value', -1] }, end: '$$this' }]
//                         ]
//                       },
//                       else: { $concatArrays: ['$$value', [{ start: '$$this', end: '$$this' }]] }
//                     }
//                   }
//                 }
//               }
//             }
//           },
//           _id: 0
//         }
//       },
//       { $sort: { chapter: 1 } }
//     ]);
//     res.json(chapters);
//   } catch (err) {
//     next(err);
//   }
// });

// // GET verses for a chapter
// router.get('/chapter/:surahNumber', async (req, res, next) => {
//   try {
//     const verses = await QuranVerse.find({ surahNumber: req.params.surahNumber })
//       .select('surahNumber surahNameArabic surahNameEnglish verseNumber arabicText englishTranslation')
//       .sort({ verseNumber: 1 });
//     res.json(verses);
//   } catch (err) {
//     next(err);
//   }
// });

// // SEARCH surahs and verses by English name, surah number, verse number, or range
// router.get('/search', async (req, res, next) => {
//   try {
//     const { query } = req.query;
//     if (!query) return res.json([]);

//     // Parse query for verse range (e.g., "1:1-5" or "1-5")
//     const rangeMatch = query.match(/^(\d+):(\d+)-(\d+)$/);
//     if (rangeMatch) {
//       const [_, surahNumber, start, end] = rangeMatch;
//       const verses = await QuranVerse.find({
//         surahNumber: parseInt(surahNumber),
//         verseNumber: { $gte: parseInt(start), $lte: parseInt(end) }
//       })
//         .select('surahNumber surahNameArabic surahNameEnglish verseNumber arabicText englishTranslation')
//         .sort({ verseNumber: 1 });
//       return res.json(verses);
//     }

//     // Parse query for surah number:verse number (e.g., "1:1")
//     const verseMatch = query.match(/^(\d+):(\d+)$/);
//     if (verseMatch) {
//       const [_, surahNumber, verseNumber] = verseMatch;
//       const verses = await QuranVerse.find({
//         surahNumber: parseInt(surahNumber),
//         verseNumber: parseInt(verseNumber)
//       })
//         .select('surahNumber surahNameArabic surahNameEnglish verseNumber arabicText englishTranslation');
//       return res.json(verses);
//     }

//     // Search by surah number or English name
//     const surahNumber = parseInt(query);
//     if (!isNaN(surahNumber)) {
//       const verses = await QuranVerse.find({ surahNumber })
//         .select('surahNumber surahNameArabic surahNameEnglish verseNumber arabicText englishTranslation')
//         .sort({ verseNumber: 1 });
//       return res.json(verses);
//     }

//     // Search by English name
//     const verses = await QuranVerse.find({ $text: { $search: query } })
//       .select('surahNumber surahNameArabic surahNameEnglish verseNumber arabicText englishTranslation')
//       .sort({ surahNumber: 1, verseNumber: 1 })
//       .limit(50);
//     res.json(verses);
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const QuranVerse = require('../models/QuranVerse');
// const Surah = require('../models/Surah');

// // GET all chapters (surahs) with verse ranges
// router.get('/chapters', async (req, res, next) => {
//   try {
//     const chapters = await Surah.aggregate([
//       {
//         $lookup: {
//           from: 'quranVerses',
//           localField: '_id',
//           foreignField: 'surahId',
//           as: 'verses'
//         }
//       },
//       {
//         $project: {
//           chapter: '$surahNumber',
//           surahNameArabic: 1,
//           surahNameEnglish: 1,
//           verseRanges: {
//             $reduce: {
//               input: '$verses.verseNumber',
//               initialValue: [],
//               in: {
//                 $cond: {
//                   if: { $eq: ['$$this', { $arrayElemAt: ['$verses.verseNumber', { $subtract: [{ $size: '$verses.verseNumber' }, 1] }] }] },
//                   then: { $concatArrays: ['$$value', [{ start: '$$this', end: '$$this' }]] },
//                   else: {
//                     $cond: {
//                       if: { $eq: ['$$this', { $add: [{ $arrayElemAt: ['$$value', -1] }, 1] } ] },
//                       then: {
//                         $concatArrays: [
//                           { $slice: ['$$value', 0, { $subtract: [{ $size: '$$value' }, 1] }] },
//                           [{ start: { $arrayElemAt: ['$$value', -1] }, end: '$$this' }]
//                         ]
//                       },
//                       else: { $concatArrays: ['$$value', [{ start: '$$this', end: '$$this' }]] }
//                     }
//                   }
//                 }
//               }
//             }
//           },
//           _id: 0
//         }
//       },
//       { $sort: { chapter: 1 } }
//     ]);
//     res.json(chapters);
//   } catch (err) {
//     next(err);
//   }
// });

// // GET verses for a chapter
// router.get('/chapter/:surahNumber', async (req, res, next) => {
//   try {
//     const surah = await Surah.findOne({ surahNumber: req.params.surahNumber });
//     if (!surah) return res.status(404).json({ message: 'Surah not found' });

//     const verses = await QuranVerse.find({ surahId: surah._id })
//       .select('surahId verseNumber arabicText englishTranslation')
//       .populate('surahId', 'surahNumber surahNameArabic surahNameEnglish')
//       .sort({ verseNumber: 1 });
//     res.json(verses);
//   } catch (err) {
//     next(err);
//   }
// });

// // SEARCH surahs and verses by English name, surah number, verse number, or range
// router.get('/search', async (req, res, next) => {
//   try {
//     const { query } = req.query;
//     if (!query) return res.json([]);

//     // Parse query for verse range (e.g., "1:1-5")
//     const rangeMatch = query.match(/^(\d+):(\d+)-(\d+)$/);
//     if (rangeMatch) {
//       const [_, surahNumber, start, end] = rangeMatch;
//       const surah = await Surah.findOne({ surahNumber: parseInt(surahNumber) });
//       if (!surah) return res.status(404).json({ message: 'Surah not found' });
//       const verses = await QuranVerse.find({
//         surahId: surah._id,
//         verseNumber: { $gte: parseInt(start), $lte: parseInt(end) }
//       })
//         .select('surahId verseNumber arabicText englishTranslation')
//         .populate('surahId', 'surahNumber surahNameArabic surahNameEnglish')
//         .sort({ verseNumber: 1 });
//       return res.json(verses);
//     }

//     // Parse query for verse number (e.g., "1:1")
//     const verseMatch = query.match(/^(\d+):(\d+)$/);
//     if (verseMatch) {
//       const [_, surahNumber, verseNumber] = verseMatch;
//       const surah = await Surah.findOne({ surahNumber: parseInt(surahNumber) });
//       if (!surah) return res.status(404).json({ message: 'Surah not found' });
//       const verses = await QuranVerse.find({
//         surahId: surah._id,
//         verseNumber: parseInt(verseNumber)
//       })
//         .select('surahId verseNumber arabicText englishTranslation')
//         .populate('surahId', 'surahNumber surahNameArabic surahNameEnglish');
//       return res.json(verses);
//     }

//     // Search by surah number
//     const surahNumber = parseInt(query);
//     if (!isNaN(surahNumber)) {
//       const surah = await Surah.findOne({ surahNumber });
//       if (!surah) return res.status(404).json({ message: 'Surah not found' });
//       const verses = await QuranVerse.find({ surahId: surah._id })
//         .select('surahId verseNumber arabicText englishTranslation')
//         .populate('surahId', 'surahNumber surahNameArabic surahNameEnglish')
//         .sort({ verseNumber: 1 });
//       return res.json(verses);
//     }

//     // Search by English name
//     const surahs = await Surah.find({ $text: { $search: query } });
//     const verses = await QuranVerse.find({ surahId: { $in: surahs.map(s => s._id) } })
//       .select('surahId verseNumber arabicText englishTranslation')
//       .populate('surahId', 'surahNumber surahNameArabic surahNameEnglish')
//       .sort({ 'surahId.surahNumber': 1, verseNumber: 1 })
//       .limit(50);
//     res.json(verses);
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const QuranVerse = require('../models/QuranVerse');
const Surah = require('../models/Surah');

// GET all chapters (surahs) with metadata
router.get('/chapters', async (req, res, next) => {
  try {
    const chapters = await Surah.find()
      .select('surahNumber surahNameArabic surahNameEnglish revelationType totalVerses')
      .sort({ surahNumber: 1 });
    res.json(chapters);
  } catch (err) {
    next(err);
  }
});

// GET verses for a chapter
router.get('/chapter/:surahNumber', async (req, res, next) => {
  try {
    const surah = await Surah.findOne({ surahNumber: req.params.surahNumber });
    if (!surah) return res.status(404).json({ message: 'Surah not found' });

    const verses = await QuranVerse.find({ surahId: surah._id })
      .select('surahId verseNumber arabicText englishTranslation')
      .populate('surahId', 'surahNumber surahNameArabic surahNameEnglish')
      .sort({ verseNumber: 1 });
    res.json({ surah, verses });
  } catch (err) {
    next(err);
  }
});

// SEARCH surahs and verses by English name, surah number, verse number, or range
router.get('/search', async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    // Parse query for verse range (e.g., "1:1-5")
    const rangeMatch = query.match(/^(\d+):(\d+)-(\d+)$/);
    if (rangeMatch) {
      const [_, surahNumber, start, end] = rangeMatch;
      const surah = await Surah.findOne({ surahNumber: parseInt(surahNumber) });
      if (!surah) return res.status(404).json({ message: 'Surah not found' });
      const verses = await QuranVerse.find({
        surahId: surah._id,
        verseNumber: { $gte: parseInt(start), $lte: parseInt(end) }
      })
        .select('surahId verseNumber arabicText englishTranslation')
        .populate('surahId', 'surahNumber surahNameArabic surahNameEnglish')
        .sort({ verseNumber: 1 });
      return res.json({ surah, verses });
    }

    // Parse query for verse number (e.g., "1:1")
    const verseMatch = query.match(/^(\d+):(\d+)$/);
    if (verseMatch) {
      const [_, surahNumber, verseNumber] = verseMatch;
      const surah = await Surah.findOne({ surahNumber: parseInt(surahNumber) });
      if (!surah) return res.status(404).json({ message: 'Surah not found' });
      const verses = await QuranVerse.find({
        surahId: surah._id,
        verseNumber: parseInt(verseNumber)
      })
        .select('surahId verseNumber arabicText englishTranslation')
        .populate('surahId', 'surahNumber surahNameArabic surahNameEnglish');
      return res.json({ surah, verses });
    }

    // Search by surah number
    const surahNumber = parseInt(query);
    if (!isNaN(surahNumber)) {
      const surah = await Surah.findOne({ surahNumber });
      if (!surah) return res.status(404).json({ message: 'Surah not found' });
      const verses = await QuranVerse.find({ surahId: surah._id })
        .select('surahId verseNumber arabicText englishTranslation')
        .populate('surahId', 'surahNumber surahNameArabic surahNameEnglish')
        .sort({ verseNumber: 1 });
      return res.json({ surah, verses });
    }

    // Search by English name
    const surahs = await Surah.find({ $text: { $search: query } });
    const verses = await QuranVerse.find({ surahId: { $in: surahs.map(s => s._id) } })
      .select('surahId verseNumber arabicText englishTranslation')
      .populate('surahId', 'surahNumber surahNameArabic surahNameEnglish')
      .sort({ 'surahId.surahNumber': 1, verseNumber: 1 })
      .limit(50);
    const groupedResults = surahs.map(surah => ({
      surah,
      verses: verses.filter(v => v.surahId._id.toString() === surah._id.toString())
    }));
    res.json(groupedResults);
  } catch (err) {
    next(err);
  }
});

module.exports = router;