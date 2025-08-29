const mongoose = require('mongoose');

const quranVerseSchema = new mongoose.Schema({
  surahId: { type: mongoose.Schema.Types.ObjectId, ref: 'Surah', required: true },
  verseNumber: { type: Number, required: true },
  arabicText: { type: String, required: true },
  englishTranslation: { type: String, required: true }
}, { collection: 'quranVerses' });

quranVerseSchema.index({ surahId: 1, verseNumber: 1 });

module.exports = mongoose.model('QuranVerse', quranVerseSchema);
