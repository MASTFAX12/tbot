const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Message = require('../models/Message');
const DeletedMessage = require('../models/DeletedMessage');
const Setting = require('../models/Setting');

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add user to watch
router.post('/users', async (req, res) => {
    try {
        const { telegramId, firstName, lastName, username } = req.body;
        let user = await User.findOne({ telegramId });
        if (user) {
            user.isWatching = true;
            await user.save();
        } else {
            user = new User({ telegramId, firstName, lastName, username });
            await user.save();
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Toggle watch status
router.put('/users/:id/toggle', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.isWatching = !user.isWatching;
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update watch types
router.put('/users/:id/types', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.watchTypes = { ...user.watchTypes, ...req.body };
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get messages (with pagination)
router.get('/messages', async (req, res) => {
    try {
        const { page = 1, limit = 50, userId } = req.query;
        const query = userId ? { userId } : {};

        const messages = await Message.find(query)
            .sort({ timestamp: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Message.countDocuments(query);

        res.json({
            messages,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get deleted messages
router.get('/deleted-messages', async (req, res) => {
    try {
        const messages = await DeletedMessage.find().sort({ deletedAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get settings
router.get('/settings', async (req, res) => {
    try {
        const settings = await Setting.find();
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update settings
router.post('/settings', async (req, res) => {
    try {
        const { key, value } = req.body;
        let setting = await Setting.findOne({ key });
        if (setting) {
            setting.value = value;
        } else {
            setting = new Setting({ key, value });
        }
        await setting.save();
        res.json(setting);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
