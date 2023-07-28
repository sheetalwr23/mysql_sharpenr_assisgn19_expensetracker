const Sequelize = require('sequelize');
const sequelize = require('../util/database');



const Expense = sequelize.define('Expense', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  
  Expense.sync()
    .then(() => {
      console.log('Expense table created');
    })
    .catch((error) => {
      console.error('Error creating Expense table:', error);
    });
  
  module.exports = Expense;