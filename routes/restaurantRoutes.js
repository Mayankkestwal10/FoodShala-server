const { getHomeRestaurantId, getHomeRestaurant, getRestaurantByCategory } = require("../controller/restaurant");

const router = require("express").Router();

router.post('/id', getHomeRestaurantId);

router.get('/home/restaurants', getHomeRestaurant);

router.post('/all', getRestaurantByCategory);

module.exports = router;