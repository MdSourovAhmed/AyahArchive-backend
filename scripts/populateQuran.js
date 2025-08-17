// const mongoose = require('mongoose');
// const fs = require('fs');
// const path = require('path');
// const QuranVerse = require('../models/QuranVerse');
// const connectDB = require('../config/db');
// require('dotenv').config();

// connectDB();

// const populateQuran = async () => {
//   try {
//     // Read the local quran.json file
//     const quranData = JSON.parse(fs.readFileSync(path.join(__dirname, 'quran.json'), 'utf8'));

//     // Transform JSON data into QuranVerse documents
//     const verses = Object.keys(quranData.surahs).flatMap(surahNumber => {
//       const surah = quranData.surahs[surahNumber];
//       return surah.verses.map(verse => ({
//         surahNumber: parseInt(surahNumber),
//         surahNameArabic: surah.arabic_name,
//         surahNameEnglish: surah.english_name,
//         revelationType: surah.revelation_type,
//         verseNumber: verse.verse,
//         arabicText: verse.arabic_text,
//         englishTranslation: verse.english_translation
//       }));
//     });

//     // Clear existing data and insert new verses
//     await QuranVerse.deleteMany({});
//     await QuranVerse.insertMany(verses);
//     console.log('Quran data populated successfully');
//     process.exit(0);
//   } catch (err) {
//     console.error('Error populating Quran:', err);
//     process.exit(1);
//   }
// };

// populateQuran();


const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Surah = require('../models/Surah');
const QuranVerse = require('../models/QuranVerse');
const connectDB = require('../config/db');
require('dotenv').config();

connectDB();

const populateQuran = async () => {
  try {
    // Read the local quran.json file
    const quranData = JSON.parse(fs.readFileSync(path.join(__dirname, 'quran.json'), 'utf8'));

    // Prepare surah documents
    const surahs = Object.keys(quranData.surahs).map(surahNumber => ({
      surahNumber: parseInt(surahNumber),
      surahNameArabic: quranData.surahs[surahNumber].arabic_name,
      surahNameEnglish: quranData.surahs[surahNumber].english_name,
      revelationType: quranData.surahs[surahNumber].revelation_type,
      totalVerses: quranData.surahs[surahNumber].total_verses
    }));

    // Clear existing data
    await Surah.deleteMany({});
    await QuranVerse.deleteMany({});

    // Insert surahs
    const insertedSurahs = await Surah.insertMany(surahs);
    const surahMap = new Map(insertedSurahs.map(s => [s.surahNumber, s._id]));

    // Prepare verse documents
    const verses = Object.keys(quranData.surahs).flatMap(surahNumber => {
      const surah = quranData.surahs[surahNumber];
      return surah.verses.map(verse => ({
        surahId: surahMap.get(parseInt(surahNumber)),
        verseNumber: verse.verse,
        arabicText: verse.arabic_text,
        englishTranslation: verse.english_translation
      }));
    });

    // Insert verses
    await QuranVerse.insertMany(verses);
    console.log('Quran data populated successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error populating Quran:', err);
    process.exit(1);
  }
};

populateQuran();