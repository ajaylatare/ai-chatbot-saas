const User = require('../models/User');
const Subscription = require('../models/Subscription');
const { success, error } = require('../utils/responseFormatter');

// Plans ki list
const getPlans = async (req, res) => {
  try {
    const plans = [
      {
        id: 'free',
        name: 'Free Plan',
        price: 0,
        features: [
          'GPT-3.5 model',
          '4000 tokens per day',
          'Basic chat features'
        ]
      },
      {
        id: 'paid',
        name: 'Pro Plan',
        price: 499,
        features: [
          'GPT-4 model',
          'Unlimited tokens',
          'Priority support',
          'Advanced features'
        ]
      }
    ];

    return success(res, plans);
  } catch (err) {
    return error(res, err.message);
  }
};

// User ka current plan
const getCurrentPlan = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      where: { userId: req.user.id }
    });

    return success(res, {
      plan: req.user.plan,
      subscription: subscription || null
    });
  } catch (err) {
    return error(res, err.message);
  }
};

// Plan upgrade karo (mock — Razorpay baad mein)
const upgradePlan = async (req, res) => {
  try {
    const userId = req.user.id;

    // User ko paid plan do
    await User.update(
      { plan: 'paid' },
      { where: { id: userId } }
    );

    // Subscription record banao
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 mahina

    await Subscription.create({
      userId,
      plan: 'paid',
      startDate,
      endDate,
      paymentId: 'mock_payment_' + Date.now()
    });

    return success(res, {
      plan: 'paid',
      message: 'Plan upgraded successfully!'
    });

  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { getPlans, getCurrentPlan, upgradePlan };