const express = require('express')
const cors = require("cors");
require('dotenv').config()
const initRoutes = require("./src/routes");

const app = express();
const port = process.env.PORT;

let corsOptions = {
    origin: process.env.BASE_URL
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
global.__basedir = __dirname;
initRoutes(app)

app.listen(port, () => {
    console.log("============= hello server")
    console.log(`Running at localhost:${port}`);
});