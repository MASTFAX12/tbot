const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageId: { type: Number, required: true },
    chatId: { type: Number, required: true },
    userId: { type: Number, required: true },
    senderName: { type: String },
    type: { type: String, required: true }, // text, photo, video, etc.
    content: { type: mongoose.Schema.Types.Mixed }, // Text content or file ID/URL
    caption: { type: String },
    rawMessage: { type: Object }, // Store full raw JSON from Telegram for debugging/completeness
    timestamp: { type: Date, default: Date.now }
});

// Compound index to ensure uniqueness of message within a chat
messageSchema.index({ messageId: 1, chatId: 1 }, { unique: true });

module.exports = mongoose.model('Message', messageSchema);
