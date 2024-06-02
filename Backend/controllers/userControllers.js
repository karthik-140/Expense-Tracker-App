const users = require('../models/users');

exports.singupUser = (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    users.create({ name: name, email: email, password: password })
      .then((result) => {
        console.log('User sing-up succesful');
        res.status(201).json({ message: 'User sign-up successful', result });
      }).catch(err => {
        console.log('Email already exists!!', err);
        res.status(500).json({ message: 'Email already exists!!', details: err });
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
      res.status(403).json({ message: 'Email does not found!!' })
    } else if (user.password !== password) {
      res.status(403).json({ message: 'Password is Incorrect!!' })
    } else {
      res.status(201).json({ response: user })
    }

  } catch (err) {
    console.log('Server Error!!', err)
    res.status(500).json({ message: 'Server Error!!', details: err })
  }
}
