const Sequelize = require('sequelize');

const DB = require('../config/db');
const Items = require('./item');
const Users = require('./users');

const Orders = DB.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    foodItemId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    restaurantId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    customerId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    foodItemName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    customerName: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { timestamps: false });

module.exports = Orders;