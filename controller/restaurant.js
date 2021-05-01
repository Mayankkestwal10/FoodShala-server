const Users = require("../model/users");
const logger = require("../utils/logger");
const Op = require('sequelize').Op;

//Get details of a particular Restaurant
exports.getHomeRestaurantId = async (req, res) => {
    try {
        const restaurant = await Users.findAll({ where: { id: req.body.id, role: 'restaurant' } });
        return res.json({
            restaurant: restaurant
        })
    } catch (err) {
        logger.log("error", `restaurant.js | getHomeRestaurantId | ${err}`);
    }
}

//Get List of Restaurant on Home Page
exports.getHomeRestaurant = async (req, res) => {
    try {
        const restaurants = await Users.findAll({ where: { role: 'restaurant' }, limit: 3 });
        return res.json({
            restaurants: restaurants
        })
    } catch (err) {
        logger.log("error", `restaurant.js | getHomeRestaurant | ${err}`);
    }
}



//Get List of Restaurant By Food Category 
exports.getRestaurantByCategory = async (req, res) => {
    try {
        if (req.body.category == 'both') {
            const restaurants = await Users.findAll({ where: { role: 'restaurant' } });
            return res.json({
                restaurants: restaurants
            })
        } else {
            const restaurants = await Users.findAll({
                where: {
                    role: 'restaurant', category: {
                        [Op.or]: [req.body.category, 'both']
                    }
                }
            });
            return res.json({
                restaurants: restaurants
            })
        }

    } catch (err) {
        logger.log("error", `restaurant.js | getRestaurantByCategory | ${err}`);
    }
}

