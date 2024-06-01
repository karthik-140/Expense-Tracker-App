const users = require('../models/users');

exports.singupUser = (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    users.create({ name: name, email: email, password: password })
      .then((result) => {
        console.log('User sing-up succesful');
        res.status(200).json({ message: 'User sign-up successful', result });
      }).catch(err => {
        console.log('Error in Signing up', err);
        res.status(500).json({ message: 'Error in Signing up', details: err });
      })

  } catch (err) {
    console.log('Error in signupUser function', err);
    res.status(500).json({ error: 'Server error' });
  }
}
