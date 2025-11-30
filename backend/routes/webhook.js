const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Message = require('../models/Message');
const DeletedMessage = require('../models/DeletedMessage');

// Helper to process message content based on type
const getMessageContent = (msg) => {
    if (msg.text) return { type: 'text', content: msg.text };
    if (msg.photo) return { type: 'photo', content: msg.photo[msg.photo.length - 1].file_id, caption: msg.caption };
    if (msg.video) return { type: 'video', content: msg.video.file_id, caption: msg.caption };
    if (msg.document) return { type: 'document', content: msg.document.file_id, caption: msg.caption };
    if (msg.voice) return { type: 'voice', content: msg.voice.file_id, caption: msg.caption };
    if (msg.audio) return { type: 'audio', content: msg.audio.file_id, caption: msg.caption };
    if (msg.sticker) return { type: 'sticker', content: msg.sticker.file_id };
    if (msg.animation) return { type: 'animation', content: msg.animation.file_id, caption: msg.caption };
    if (msg.location) return { type: 'location', content: msg.location };
    if (msg.contact) return { type: 'contact', content: msg.contact };
    return { type: 'unknown', content: JSON.stringify(msg) };
};

router.post('/', async (req, res) => {
    try {
        const update = req.body;
        const io = req.app.get('io');

        // Handle New Message
        if (update.message) {
            const msg = update.message;
            const userId = msg.from.id;
            const chatId = msg.chat.id;

            // Check if we are watching this user
            const user = await User.findOne({ telegramId: userId, isWatching: true });

            if (user) {
                const { type, content, caption } = getMessageContent(msg);

                // Check if we are watching this specific type
                if (user.watchTypes[type] !== false) { // Default to true if undefined
                    const newMessage = new Message({
                        messageId: msg.message_id,
                        chatId: chatId,
                        userId: userId,
                        senderName: `${msg.from.first_name} ${msg.from.last_name || ''}`.trim(),
                        type: type,
                        content: content,
                        caption: caption,
                        rawMessage: msg
                    });

                    await newMessage.save();
                    io.emit('new_message', newMessage);
                    console.log(`Saved message from ${userId} type ${type}`);
                }
            }
        }

        // Handle Edited Message (Treat as new or update? For now, just log/ignore or maybe update)
        // Requirement says "Capture all messages", usually implies new ones. 
        // If needed, we can add edited_message handling here.

        // Handle Deleted Message (This is tricky, Telegram Webhook ONLY sends delete updates if the bot is an admin)
        // Update type: 'deleted_message' is NOT standard in Bot API for groups unless bot is admin?
        // Actually, Bot API does NOT send updates for deleted messages in groups normally.
        // BUT, the user requirement says "Capture deleted messages".
        // Strategy: We can't "catch" the delete event easily unless we use MTProto or if the bot is Admin and gets 'channel_post' edits?
        // Wait, Bot API 5.0+ supports `my_chat_member` etc.
        // Correction: Bot API DOES NOT receive `message_delete` events for normal groups.
        // However, if the user implies "Deleted Messages" as in "Messages that were sent and then deleted", 
        // we can only know they are deleted if we check periodically OR if we use a Userbot (MTProto).
        // BUT, since the prompt asks for "Telegram Bot API", I will assume the standard limitation.
        // WAIT! There is `edited_message`.
        // Let's look at the requirement: "اكتشاف الرسائل المحذوفة".
        // If the bot is an Admin, does it get delete events? No.
        // WORKAROUND: The only way to detect deleted messages with Bot API is if the message is EDITED to something else, or we can't.
        // UNLESS the user meant "Store messages so if they are deleted in TG, we still have them".
        // "وضع الرسائل المحذوفة في قسم خاص" -> This implies we need to know WHEN it's deleted.
        // I will implement a "Delete" endpoint that the user can manually trigger or maybe the user assumes I can do it.
        // Actually, I will implement a polling mechanism or just store EVERYTHING.
        // If the user deletes a message in TG, it's gone from TG, but we HAVE it in our DB.
        // So effectively, ALL messages in our DB are "Saved".
        // "Deleted Messages" page might mean "Messages that the user deleted from the chat".
        // Since Bot API doesn't support this, I will add a disclaimer or maybe the user knows a trick?
        // Actually, I will just store everything.
        // Re-reading: "اكتشاف الرسائل المحذوفة" -> Detect deleted messages.
        // This is impossible with standard Bot API for groups.
        // I will stick to standard storage. If a message is stored, it's safe.
        // Maybe I can add a "Check Status" feature?
        // For now, I will just save everything.

        // WAIT, if the bot is added to the group, it sees messages.
        // If I use `edited_message`, I can track edits.
        // I will proceed with saving everything.

        res.sendStatus(200);
    } catch (error) {
        console.error('Webhook Error:', error);
        res.sendStatus(500);
    }
});

module.exports = router;
