const Sequelize = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(process.env.DBNAME, process.env.USER, process.env.PASS, {
    dialect: 'mysql',
    host: process.env.SERVER
});

module.exports = sequelize;