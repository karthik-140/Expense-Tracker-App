const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, 'root', process.env.DATABASE_ROOT_PASSWORD, {
  dialect: 'mysql',
  host: 'localhost'
})

module.exports = sequelize;
