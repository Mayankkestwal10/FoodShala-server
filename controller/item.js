const Items = require("../model/items");
const logger = require("../utils/logger");
const uuid = require("uuid");

exports.addItem = async (req, res) => {

    try {

        var name = req.body.name
        var foodType = req.body.foodType
        var price = req.body.price
        var restaurantId = req.body.restaurantId

        if (!req.files) {
            res.send("No file upload");
        } else {
            var file = req.files.image
            if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
                var imageName = file.name
                var uuidname = uuid.v1();
                var imgsrc = 'http://127.0.0.1:8080/images/' + uuidname + imageName;

                Items.create({
                    id: '',
                    name: name,
                    foodType: foodType,
                    price: price,
                    restaurantId: restaurantId,
                    image: imgsrc
                });

                file.mv('public/images/' + uuidname + imageName)
                return res.json({
                    message:'Success'
                });

            } else {
                 
            }
        }


    } catch (err) {

        logger.log("error", `item.js | addItem | ${err}`);
  
    }


}

exports.deleteItem = async (req, res) => {
    try{
        const id = req.body.id;
        await Items.destroy({
            where:{id:id}
        });
        return res.json({
            message:"deleted"
        });
    }catch(err){
        logger.log("error", `item.js | deleteItem | ${err}`);
    }
}

exports.getListItems = async (req, res) => {
    try {

        var id = req.body.id;
        const foodItems = await Items.findAll({
            where:{restaurantId:id}
        });

        return res.json({
            foodItems:foodItems
        });

    } catch (err) {

        logger.log("error", `item.js | getListItems | ${err}`);
  
    }
}