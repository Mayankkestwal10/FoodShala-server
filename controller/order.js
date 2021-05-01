const Orders = require("../model/orders");
const logger = require("../utils/logger");


exports.addOrder = async (req, res) => {
    try{
        const foodItemId = req.body.foodItemId;
        const foodItemName = req.body.foodItemName;
        const restaurantId = req.body.restaurantId;
        const customerId = req.body.customerId;
        const customerName = req.body.customerName;
        const restaurantName = req.body.restaurantName;
        const restaurantMobile = req.body.restaurantMobile;
        const customerAddress = req.body.customerAddress;
        const customerMobile = req.body.customerMobile;
        
        await Orders.create({
            id:'',
            foodItemId:foodItemId,
            foodItemName:foodItemName,
            restaurantId:restaurantId,
            customerId:customerId,
            customerName: customerName,
            restaurantName: restaurantName,
            restaurantMobile: restaurantMobile,
            customerAddress: customerAddress,
            customerMobile: customerMobile
        });

        res.json({
            message:"Order Placed"
        });

    }catch(err){
        logger.log("error", `order.js | addOrder | ${err}`);
    }
}

exports.getOrdersRestaurant = async (req, res) => {
    try{
        const id = req.body.id;

        const orders = await Orders.findAll({
            where:{
                restaurantId: id
            }
        });

        return res.json({
            orders:orders
        });
    }catch(err){
        logger.log("error", `order.js | getOrderRestaurant | ${err}`);
    }
}


exports.getOrderCustomers = async (req, res) => {
    try{
        const id = req.body.id;
        const orders = await Orders.findAll({
            where:{
                customerId: id
            }
        });

        return res.json({
            orders:orders
        });
    }catch(err){
        logger.log("error", `order.js | getOrderCustomers | ${err}`);
    }
}

