const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nama database
  process.env.DB_USER,      // Username
  process.env.DB_PASS,      // Password
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,  // <--- port masuk ke options!
    logging: false,
  }
);

module.exports = sequelize;