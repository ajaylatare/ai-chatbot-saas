const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createConversation,
  getConversations,
  sendMessage,
  getMessages
} = require('../controllers/chatController');

// Sab chat routes protected hain — login karna zaroori hai
router.use(authMiddleware);

router.post('/conversations', createConversation);
router.get('/conversations', getConversations);
router.post('/send', sendMessage);
router.get('/messages/:conversationId', getMessages);

module.exports = router;