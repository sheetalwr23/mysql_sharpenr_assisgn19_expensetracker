const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Insert expense
router.post('/', async (req, res) => {
    try {
      const { amount, description, category } = req.body;
      const expense = await Expense.create({ amount, description, category });
      res.json(expense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Delete expense
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Update expense
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, category } = req.body;
    await Expense.update({ amount, description, category }, { where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
