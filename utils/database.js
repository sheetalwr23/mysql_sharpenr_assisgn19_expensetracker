const { Sequelize } = require('sequelize');

const db = new Sequelize('node_complete', 'root', 'Saibaba@1234', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = db;
