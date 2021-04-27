const express = require('express');
const app = express();
const DB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
require('dotenv').config();

//Routes
app.use('/', userRoutes);

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