const { addOrder, getOrderCustomers, getOrdersRestaurant } = require("../controller/order");

const router = require("express").Router();

router.post('/add', addOrder);

router.post('/rest/orders', getOrdersRestaurant);

router.post('/customer/orders', getOrderCustomers);

module.exports = router;
