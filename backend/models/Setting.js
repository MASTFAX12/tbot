const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true }, // e.g., 'bot_token', 'group_id'
    value: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Setting', settingSchema);
