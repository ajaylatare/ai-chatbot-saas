const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const TokenUsage = sequelize.define('TokenUsage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tokensUsed: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
 date: {
  type: DataTypes.DATEONLY,
  allowNull: false
},
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

User.hasMany(TokenUsage, { foreignKey: 'userId' });
TokenUsage.belongsTo(User, { foreignKey: 'userId' });

module.exports = TokenUsage;