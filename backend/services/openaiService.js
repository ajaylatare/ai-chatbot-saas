const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const getChatResponse = async (messages, plan) => {
  try {
    // Agar API key hai toh real Gemini use karo
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'mock') {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const history = messages.slice(0, -1).map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const lastMessage = messages[messages.length - 1].content;
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(lastMessage);
      const response = result.response.text();

      return {
        content: response,
        tokensUsed: Math.ceil(response.length / 4)
      };
    }

    // API key nahi hai ya mock hai toh demo response
    throw new Error('Using demo mode');

  } catch (err) {
    // Mock response — demo ke liye
    const modelName = plan === 'paid' ? 'Gemini Pro (Paid)' : 'Gemini Flash (Free)';
    const lastMessage = messages[messages.length - 1].content;

    return {
      content: `[${modelName}] You asked: "${lastMessage}". This is a demo response. Real Gemini AI integration is ready — just add a valid API key!`,
      tokensUsed: Math.floor(Math.random() * 100) + 50
    };
  }
};

module.exports = { getChatResponse };