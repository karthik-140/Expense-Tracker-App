const expenses = require('../models/expenses');
const users = require('../models/users');

exports.addExpense = async (req, res, next) => {
  try {
    const { amount, description, category } = req.body;
    const totalExpense = Number(req.user.totalExpenses) + Number(amount)

    const expense = await expenses.create({ amount, description, category, userId: req.user.id })
    const user = await users.update(
      { totalExpenses: totalExpense },
      { where: { id: req.user.id } }
    )

    Promise.all([expense, user])
      .then(() => {
        res.status(201).json({ message: 'Expense added successfully!!', expense })
      }).catch((err) => {
        console.log('something went wrong!!', err)
        res.status(400).json({ message: 'Something went wrong!!', err })
      })

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
    const { amount } = req.body
    const updateTotalExpense = Number(req.user.totalExpenses) - Number(amount)

    const deleteExpense = await expenses.destroy({ where: { id: id, userId: req.user.id } })
    const updateUser = users.update(
      { totalExpenses: updateTotalExpense },
      { where: { id: req.user.id } }
    )

    Promise.all([deleteExpense, updateUser])
    .then(() => {
      res.status(200).json({ message: 'Expense deleted successfully!!', response: deleteExpense })
    })
    .catch((err) => {
      res.status(204).json({ message: 'Something went wrong!!', details: err })
    })

  } catch (err) {
    console.log('Server error!!', err);
    res.status(500).json({ message: 'Server error!!', details: err })
  }
}
