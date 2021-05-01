const Users = require("../model/users");
const logger = require("../utils/logger");

exports.getUsername = async (req, res) => {
    try {
        const id = req.body.id;

        const user = await Users.findAll({ where: { id: id } });

        return res.json({
            username: user[0].name
        });
    } catch (err) {
        logger.log("error", `restaurant.js | getUsername | ${err}`);

    }


}

exports.updateDetails = async (req, res) => {
    try {
        const category = req.body.category;
        const mobile = req.body.mobile;
        const id = req.body.id;
        const address = req.body.address;

        const result = await Users.update(
            { category: category, mobile:mobile, address:address },
            { where: { id: id } }
        )

        return res.json({
            message: 'Details Updated'
        });
    } catch (err) {
        logger.log("error", `restaurant.js | updateDetails | ${err}`);
    }

}