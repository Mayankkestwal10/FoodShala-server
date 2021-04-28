const express = require('express');
const app = express();
const DB = require('./config/db');
const fileUpload = require('express-fileupload');
const logger = require("./utils/logger");

const userRoutes = require("./routes/userRoutes");

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(fileUpload())
app.use(express.static("./public"))


//Routes
app.use('/auth', userRoutes);

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