const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getProfile } = require('../controllers/userController');

router.use(authMiddleware);

router.get('/profile', getProfile);

module.exports = router;