const express = require('express');
const app = express();
const DB = require('./config/db');
const fileUpload = require('express-fileupload');
const logger = require("./utils/logger");
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const itemRoutes = require("./routes/itemRoutes");
const orderRoutes = require("./routes/orderRoutes");

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use(fileUpload())
app.use(express.static("./public"))


//Routes
app.use('/auth', userRoutes);
app.use('/rest', restaurantRoutes);
app.use('/food', itemRoutes);
app.use('/order', orderRoutes);
DB
    .sync()
    .then(result => {
        console.log("DB Connected");
    })
    .catch(err => {
        console.log(err);
});


const port = process.env.PORT || 8000;

app.listen(port, () =>
    console.log(`Server running on port ${port}`)
)