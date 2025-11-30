const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  isWatching: { type: Boolean, default: true },
  watchTypes: {
    text: { type: Boolean, default: true },
    photo: { type: Boolean, default: true },
    video: { type: Boolean, default: true },
    document: { type: Boolean, default: true },
    voice: { type: Boolean, default: true },
    sticker: { type: Boolean, default: true },
    audio: { type: Boolean, default: true },
    animation: { type: Boolean, default: true }, // GIF
    location: { type: Boolean, default: true },
    contact: { type: Boolean, default: true },
    other: { type: Boolean, default: true }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
