const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/userControllers');

router.post('/signup', userControllers.singupUser)

module.exports = router;
