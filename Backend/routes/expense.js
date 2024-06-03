const express = require('express');

const router = express.Router();

const expenseControllers = require('../controllers/expenseControllers');

const userAuthentication = require('../middleware/auth');

router.get('/', userAuthentication.authenticate, expenseControllers.getExpenses);

router.delete('/:id', userAuthentication.authenticate, expenseControllers.deleteExpense);

router.post('/addExpense', userAuthentication.authenticate, expenseControllers.addExpense);

module.exports = router;
