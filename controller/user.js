const Users = require("../model/users");

exports.getUsername = async (req, res) => {
    
    const id = req.body.id;

    const user = await Users.findAll({ where: { id: id } });
    
    return res.json({
        username: user[0].name
    });
}

exports.updateDetails = async (req, res) => {
    const category = req.body.category;
    const mobile = req.body.mobile;
    const id = req.body.id;

    
    const result = await Users.update(
        {category:category},
        {where:{id:id}}
    )

    return res.json({
        message: 'Details Updated'
    });
}