const TokenUsage = require('../models/TokenUsage');
const { Op } = require('sequelize');

const saveTokenUsage = async (userId, tokensUsed) => {

  const today = new Date().toISOString().split('T')[0];

  // Aaj ki entry dhundo
  const existing = await TokenUsage.findOne({
    where: { userId, date: today }
  });

  if (existing) {
    // Pehle se entry hai toh add karo
    existing.tokensUsed += tokensUsed;
    await existing.save();
  } else {
    // Nahi hai toh naya banao
    await TokenUsage.create({ userId, tokensUsed, date: today });
  }
};

const getTodayUsage = async (userId) => {
  const today = new Date().toISOString().split('T')[0];

  const usage = await TokenUsage.findOne({
    where: { userId, date: today }
  });

  return usage ? usage.tokensUsed : 0;
};

module.exports = { saveTokenUsage, getTodayUsage };