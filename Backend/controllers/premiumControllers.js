const expenses = require('../models/expenses');
const users = require('../models/users');
const Sequelize = require('sequelize');

exports.getPremiumLeaderboard = async (req, res, next) => {
  try {
    const Users = await users.findAll()
    const Expenses = await expenses.findAll()

    const userExpenses = {}
    Expenses.forEach((expense) => {
      if (userExpenses[expense.userId]) {
        userExpenses[expense.userId] += expense.amount
      } else {
        userExpenses[expense.userId] = expense.amount
      }
    })

    const leaderboard = []
    Users.forEach((user) => {
      leaderboard.push({ name: user.name, totalExpenses: userExpenses[user.id] || 0 })
    })
    const sortedLeaderboard = leaderboard.sort((a, b) => b.totalExpenses - a.totalExpenses)

    res.status(200).json(sortedLeaderboard);
  } catch (err) {
    console.log('Server Error!!', err);
    res.status(500).json({ message: 'Server Error', details: err });
  }
}
