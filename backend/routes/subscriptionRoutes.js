const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getPlans,
  getCurrentPlan,
  upgradePlan
} = require('../controllers/subscriptionController');

router.use(authMiddleware);

router.get('/plans', getPlans);
router.get('/current', getCurrentPlan);
router.post('/upgrade', upgradePlan);

module.exports = router;