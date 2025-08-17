const mongoose = require('mongoose');

const surahSchema = new mongoose.Schema({
  surahNumber: { type: Number, required: true, unique: true },
  surahNameArabic: { type: String, required: true },
  surahNameEnglish: { type: String, required: true },
  revelationType: { type: String, enum: ['meccan', 'medinan'], required: true },
  totalVerses: { type: Number, required: true }
}, { collection: 'surahs' });

surahSchema.index({ surahNumber: 1 });
surahSchema.index({ surahNameEnglish: 'text' });

module.exports = mongoose.model('Surah', surahSchema);