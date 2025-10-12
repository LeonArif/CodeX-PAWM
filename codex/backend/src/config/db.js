const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_URL, // <--- Langsung pakai link connection string
  {
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;