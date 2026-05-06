const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/db');

// Models import karo taaki tables ban jayein
require('./models/User');
require('./models/Conversation');
require('./models/Message');
require('./models/Subscription');
require('./models/TokenUsage');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'AI Chatbot API is running!' });
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

 const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

const subscriptionRoutes = require('./routes/subscriptionRoutes');
app.use('/api/subscription', subscriptionRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })  // Tables automatically ban jayengi
  .then(() => {
    console.log('✅ Database tables ready!');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error:', err.message);
  });

 