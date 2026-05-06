const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { getChatResponse } = require('../services/openaiService');
const { saveTokenUsage, getTodayUsage } = require('../services/tokenService');
const { success, error } = require('../utils/responseFormatter');

// Free user ka daily token limit
const FREE_TOKEN_LIMIT = 4000;

// Naya conversation banao
const createConversation = async (req, res) => {
  try {
    const conversation = await Conversation.create({
      userId: req.user.id,
      title: 'New Chat'
    });

    return success(res, conversation, 'Conversation created');
  } catch (err) {
    return error(res, err.message);
  }
};

// Sab conversations lao
const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    return success(res, conversations);
  } catch (err) {
    return error(res, err.message);
  }
};

// Message bhejo aur AI ka reply lao
const sendMessage = async (req, res) => {
  try {
    const { conversationId, message } = req.body;
    const userId = req.user.id;
    const userPlan = req.user.plan;

    // Free user ka token limit check karo
    if (userPlan === 'free') {
      const todayUsage = await getTodayUsage(userId);
      if (todayUsage >= FREE_TOKEN_LIMIT) {
        return error(res, 'Daily limit reached. Please upgrade to paid plan.', 403);
      }
    }

    // Pehle ke messages lao (context ke liye)
    const previousMessages = await Message.findAll({
      where: { conversationId },
      order: [['createdAt', 'ASC']]
    });

    // OpenAI format mein messages banao
    const messageHistory = previousMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Naya user message add karo
    messageHistory.push({ role: 'user', content: message });

    // User ka message save karo
    await Message.create({
      conversationId,
      role: 'user',
      content: message,
      tokensUsed: 0
    });

    // OpenAI se response lao
    const aiResponse = await getChatResponse(messageHistory, userPlan);

    // AI ka reply save karo
    await Message.create({
      conversationId,
      role: 'assistant',
      content: aiResponse.content,
      tokensUsed: aiResponse.tokensUsed
    });

    // Token usage save karo
    await saveTokenUsage(userId, aiResponse.tokensUsed);

    return success(res, {
      reply: aiResponse.content,
      tokensUsed: aiResponse.tokensUsed
    });

  } catch (err) {
    return error(res, err.message);
  }
};

// Conversation ke sab messages lao
const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.findAll({
      where: { conversationId },
      order: [['createdAt', 'ASC']]
    });

    return success(res, messages);
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { createConversation, getConversations, sendMessage, getMessages };