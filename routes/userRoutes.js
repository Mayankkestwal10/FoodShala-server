const router = require("express").Router();

const { userSignup, restaurantSignup, login, signout } = require("../controller/auth");
const {check} = require('express-validator');
const { getUsername, updateDetails } = require("../controller/user");


router.get('/', async(req, res)=>{
    res.send("Ji")
});

router.post('/customer/signup',
[
    check("name", "name should be at least 3 characters").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 8 characters").isLength({ min: 8 }),
    // check('category', 'Choose a food category').isIn(['veg', 'non-veg', 'both']),
    // check('mobile', 'enter mobile').notEmpty()
],
userSignup);

router.post('/restaurant/signup',
[
    check("name", "name should be at least 3 characters").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 8 characters").isLength({ min: 8 }),
    check('category', 'Choose a food category').isIn(['veg', 'non-veg', 'both']),
    check('address', 'enter address').notEmpty(),
    check('mobile', 'enter mobile').notEmpty()
],
restaurantSignup);

router.post('/login',
[
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 8 characters").isLength({ min: 8 })
],
login);

router.get('/logout',
signout);

router.post('/username', getUsername);

router.post('/user/update', updateDetails);


module.exports = router;