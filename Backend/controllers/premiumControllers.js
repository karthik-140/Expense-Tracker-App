const expenses = require('../models/expenses');
const users = require('../models/users');
const sequelize = require('../util/database');

exports.getPremiumLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await users.findAll({
      attributes: ['id', 'name', [sequelize.fn('SUM', sequelize.col('expenses.amount')), 'totalExpenses']],
      include: [
        {
          model: expenses,
          attributes: []
        }
      ],
      group: ['users.id'],
      order: [['totalExpenses', 'DESC']]
    })

    res.status(200).json(leaderboard);

  } catch (err) {
    console.log('Server Error!!', err);
    res.status(500).json({ message: 'Server Error', details: err });
  }
}
