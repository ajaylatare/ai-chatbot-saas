const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Conversation = require('./Conversation');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role: {
    type: DataTypes.ENUM('user', 'assistant'),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tokensUsed: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  conversationId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Relation — ek conversation mein multiple messages honge
Conversation.hasMany(Message, { foreignKey: 'conversationId' });
Message.belongsTo(Conversation, { foreignKey: 'conversationId' });

module.exports = Message;