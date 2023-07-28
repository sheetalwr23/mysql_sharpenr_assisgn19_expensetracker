const Expense = require('../models/expenseModel');

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving expenses.' });
  }
};

exports.createExpense = async (req, res) => {
  const { amount, description, category } = req.body;

  try {
    const expense = await Expense.create({ amount, description, category });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the expense.' });
  }
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, description, category } = req.body;

  try {
    const expense = await Expense.findByPk(id);
    if (expense) {
      expense.amount = amount;
      expense.description = description;
      expense.category = category;
      await expense.save();
      res.json(expense);
    } else {
      res.status(404).json({ error: 'Expense not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the expense.' });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByPk(id);
    if (expense) {
      await expense.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Expense not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the expense.' });
  }
};
