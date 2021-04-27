const Sequelize = require('sequelize');

const DB = require('../config/db');
const Users = require('./users');

const Items = DB.define('items', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    foodType: {
        type: Sequelize.ENUM,
        values: ['veg', 'non-veg'],
        defaultValue: 'veg',
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        defaultValue: 100,
        allowNull: false
    },
    restaurantId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    image: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, { timestamps: false });

module.exports = Items;