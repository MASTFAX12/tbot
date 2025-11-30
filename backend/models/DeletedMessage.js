const mongoose = require('mongoose');

const deletedMessageSchema = new mongoose.Schema({
    originalMessageId: { type: Number, required: true },
    chatId: { type: Number, required: true },
    userId: { type: Number }, // Might not be available in delete update, but we try to find it from stored messages
    senderName: { type: String },
    type: { type: String },
    content: { type: mongoose.Schema.Types.Mixed },
    caption: { type: String },
    deletedAt: { type: Date, default: Date.now },
    originalTimestamp: { type: Date }
});

module.exports = mongoose.model('DeletedMessage', deletedMessageSchema);
