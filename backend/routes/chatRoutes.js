const express = require('express');
const router = express.Router();
const { sendMessage, clearChat, getHistory } = require('../controllers/chatController');

router.post('/send', sendMessage);
router.post('/clear', clearChat);
router.get('/history', getHistory);

module.exports = router;
