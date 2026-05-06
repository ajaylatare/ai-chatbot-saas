const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Conversation = sequelize.define('Conversation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    defaultValue: 'New Chat'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Relation — ek user ke multiple conversations ho sakte hain
User.hasMany(Conversation, { foreignKey: 'userId' });
Conversation.belongsTo(User, { foreignKey: 'userId' });

module.exports = Conversation;