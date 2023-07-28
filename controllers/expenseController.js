const Expense = require('../models/Expense');

// Show all expenses
exports.showExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.render('expenses', { expenses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
