const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/userControllers');

router.post('/signup', userControllers.singupUser);

router.post('/login', userControllers.loginUser);

router.post('/password/forgotPassword', userControllers.forgotPassword);

module.exports = router;
