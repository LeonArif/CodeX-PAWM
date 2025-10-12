const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Progress = sequelize.define('Progress', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  modules: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
});

module.exports = Progress;