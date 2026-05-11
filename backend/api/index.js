const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('../config/db');
require('../models/User');
require('../models/Conversation');
require('../models/Message');
require('../models/Subscription');
require('../models/TokenUsage');

const authRoutes = require('../routes/authRoutes');
const chatRoutes = require('../routes/chatRoutes');
const userRoutes = require('../routes/userRoutes');
const subscriptionRoutes = require('../routes/subscriptionRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);
app.use('/api/subscription', subscriptionRoutes);

sequelize.sync({ alter: true }).catch(console.error);

module.exports = app;