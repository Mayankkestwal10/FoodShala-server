const router = require("express").Router();

router.get('/', async(req, res)=>{
    res.send("Ji")
});

module.exports = router;