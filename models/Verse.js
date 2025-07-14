const mongoose = require('mongoose');

const verseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: String, required: true },
  chapter: { type: Number, required: true },
  verseRange: { type: String, required: true },
  text: { type: String, required: true },
  theme: { type: [String], default: [] },
  status: { type: String, enum: ['in-progress', 'memorized'], default: 'in-progress' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

verseSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Verse', verseSchema);