const expenses = require('../models/expenses');

exports.addExpense = async (req, res, next) => {
  console.log('reqBody', req.body)
  try {
    const { amount, description, category } = req.body;
    const response = await expenses.create({ amount, description, category, userId: req.user.id })
    if (response) {
      res.status(201).json({ message: 'Expense added successfully!!', response })
    } else {
      res.status(400).json({ message: 'Something went wrong!!', response })
    }
  } catch (err) {
    console.log('Server error!!', err);
    res.status(500).json({ message: 'Server error!!', details: err })
  }
}

exports.getExpenses = async (req, res, next) => {
  try {
    const response = await expenses.findAll({ where: { userId: req.user.id } })
    if (response) {
      res.status(200).json({ message: 'Expenses fetched successfully!!', response })
    } else {
      res.status(400).json({ message: 'Something went wrong!!', response })
    }
  } catch (err) {
    console.log('Server error!!', err);
    res.status(500).json({ message: 'Server error!!', details: err })
  }
}

exports.deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await expenses.destroy({ where: { id: id, userId: req.user.id } })
    if (response) {
      console.log('deleteResponse', response)
      res.status(200).json({ message: 'Expense deleted successfully!!', response })
    } else {
      res.status(204).json({ message: 'Something went wrong!!', response })
    }
  } catch (err) {
    console.log('Server error!!', err);
    res.status(500).json({ message: 'Server error!!', details: err })
  }
}
