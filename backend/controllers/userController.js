const User = require('../models/User');
const { getTodayUsage } = require('../services/tokenService');
const { success, error } = require('../utils/responseFormatter');

const getProfile = async (req, res) => {
  try {
    // Token se user ID uthao aur database se info lao
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ['id', 'name', 'email', 'plan', 'createdAt']
    });

    // Aaj ke tokens kitne use hue
    const tokensUsed = await getTodayUsage(req.user.id);

    return success(res, {
      ...user.dataValues,
      todayTokensUsed: tokensUsed,
      dailyLimit: user.plan === 'free' ? 4000 : 'Unlimited'
    });

  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { getProfile };