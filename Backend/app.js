const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/database');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');

const users = require('./models/users');
const expenses = require('./models/expenses'); 

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);

users.hasMany(expenses);
expenses.belongsTo(users);


sequelize
  .sync()
  .then(() => {
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err)
  })
