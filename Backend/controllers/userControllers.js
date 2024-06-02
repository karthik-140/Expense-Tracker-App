const users = require('../models/users');
const bcrypt = require('bcrypt');

const isNotValidString = (value) => {
  return !!(value === undefined || value.length === 0);
}

exports.singupUser = (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (isNotValidString(name) || isNotValidString(email) || isNotValidString(password)) {
      return res.status(400).json({ message: 'Bad parameters!!' });
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      console.log('hashErr', err);
      users.create({ name: name, email: email, password: hash })
        .then((result) => {
          console.log('User sing-up succesful');
          res.status(201).json({ message: 'User sign-up successful', result });
        }).catch(err => {
          console.log('Email already exists!!', err);
          res.status(500).json({ message: 'Email already exists!!', details: err });
        })
    })

  } catch (err) {
    console.log('Error in signupUser function', err);
    res.status(500).json({ error: 'Server error' });
  }
}

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await users.findOne({ where: { email: `${email}` } })

    if (user === null) {
      res.status(404).json({ message: 'User not found!!' })
    }

    bcrypt.compare(password, user.password, (err, response) => {
      if (err) {
        res.status(500).json({ message: 'something went wrong!!' });
      }
      if (response) {
        res.status(200).json({ message: 'User login successful', response: user })
      } else {
        res.status(400).json({ message: 'Password is Incorrect!!' })
      }
    })

  } catch (err) {
    console.log('Server Error!!', err)
    res.status(500).json({ message: 'Server Error!!', details: err })
  }
}
