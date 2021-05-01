const User = require("../model/users");
const bcrypt = require("bcrypt");
const logger = require("../utils/logger");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { validationResult } = require("express-validator");
require('dotenv').config();
const uuid = require('uuid');

exports.userSignup = async (req, res, next) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new Error(errors.array()[0].msg);
        }


        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        // const category = req.body.category;
        const role = 'customer';
        // const mobile = req.body.mobile;

        const user = await User.findAll({ where: { email: email } });

        if (user[0]) {
            throw new Error("User already Exists!");
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = await User.create({
                id: '',
                name: name,
                email: email,
                password: hashedPassword,
                // category: category,
                role: role,
                // mobile: mobile
            });

            if (newUser) {

                console.log(newUser.id);

                const token = jwt.sign({ id: newUser.id }, process.env.SECRET);

                //put token in cookie
                res.cookie("token", token, { expiresIn: '1h' });

                const userObj = {
                    id: newUser.id,
                    category: newUser.category,
                    role: newUser.role,
                    name: newUser.name,
                    add: newUser.address,
                    mobile: newUser.mobile
                }

                return res.json({ token, user: userObj });

            } else {
                throw new Error("User cannot be created!");
            }
        }
    } catch (err) {

        logger.log("error", `user.js | userSignup | ${err}`);

        return res.status(400).json({
            status: err.message
        });
    }
}


exports.restaurantSignup = async (req, res, next) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new Error(errors.array()[0].msg);
        }

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const category = req.body.category;
        const role = 'restaurant';
        const address = req.body.address;
        const mobile = req.body.mobile;

        const user = await User.findAll({ where: { email: email } });

        if (user[0]) {
            throw new Error("User already Exists!");
        } else {

            if (!req.files) {
                return res.send("No file upload");
            }

            var file = req.files.image

            if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
                var imageName = file.name
                var uuidname = uuid.v1();
                var imgsrc = 'http://127.0.0.1:8080/images/' + uuidname + imageName;

                const hashedPassword = await bcrypt.hash(password, 12);
                const newUser = await User.create({
                    id: '',
                    name: name,
                    email: email,
                    password: hashedPassword,
                    category: category,
                    role: role,
                    address: address,
                    mobile: mobile,
                    image: imgsrc
                });

                file.mv('public/images/' + uuidname + imageName)

                if (newUser) {
                    return res
                        .status(201)
                        .json({
                            status: 'Success!'
                        });
                } else {
                    throw new Error("User cannot be created!");
                }


            } else {
                return res.json({
                    error:"File Format not supported"
                });
            }

        }
    } catch (err) {

        logger.log("error", `user.js | restaurantSignup | ${err}`);

        return res.status(400).json({
            status: err.message
        });
    }
}

exports.login = async (req, res, next) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findAll({ where: { email: email } }); // user is an array

        if (!user[0]) {
            throw new Error('Invalid Credentials!');
        } else {
            const doMatch = await bcrypt.compare(password, user[0].password);
            if (user && doMatch) {

                const token = jwt.sign({ id: user.id }, process.env.SECRET);

                //put token in cookie
                res.cookie("token", token, { expiresIn: '1h' });

                const userObj = {
                    id: user[0].id,
                    category: user[0].category,
                    role: user[0].role,
                    name: user[0].name,
                    add: user[0].address,
                    mobile: user[0].mobile
                }

                return res.json({ token, user: userObj });

            } else {
                throw new Error('Invalid Credentials!');
            }
        }
    } catch (err) {
        logger.log("error", `user.js | login | ${err}`);
        return res.status(400).json({
            status: err.message
        });
    }
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
      message: "User signout successfully"
    });
};

//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['RS256']
});

//custom middlewares
exports.isAuthenticated = async (req, res, next) => {

    let checker = req.profile && req.auth && req.profile.id == req.auth.id;

    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }

    user = req.auth;

    next();
};


exports.isCustomer = async (req, res, next) => {
    if (req.profile.role === 'customer') {
        return res.status(403).json({
            error: "You are not customer, Access denied"
        });
    }
    next();
};

exports.isRestaurant = async (req, res, next) => {
    if (req.profile.role === 'restaurant') {
        return res.status(403).json({
            error: "You are not restaurant member, Access denied"
        });
    }
    next();
};

