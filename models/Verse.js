const mongoose = require('mongoose');

const verseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  surahId: { type: mongoose.Schema.Types.ObjectId, ref: 'Surah', required: true },
  verseRange: { type: String, required: true }, // e.g., "1-5"
  status: { type: String, enum: ['in-progress', 'memorized'], default: 'in-progress' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

verseSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

verseSchema.index({ userId: 1, surahId: 1 });

module.exports = mongoose.model('Verse', verseSchema);
