const express = require('express');

const router = express.Router();

const expenseControllers = require('../controllers/expenseControllers');

router.get('/', expenseControllers.getExpenses);

router.delete('/:id', expenseControllers.deleteExpense);

router.post('/addExpense', expenseControllers.addExpense);

module.exports = router;
