const { addItem, getListItems, deleteItem } = require("../controller/item");

const router = require("express").Router();

router.post('/add', addItem);

router.post('/delete', deleteItem);

router.post('/items', getListItems);

module.exports = router;