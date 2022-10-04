const express = require('express')
const cors = require("cors");
require('dotenv').config()

const app = express();
const port = process.env.PORT;

let corsOptions = {
    origin: process.env.BASE_URL
};

app.use(cors(corsOptions));


app.listen(port, () => {
    console.log("============= hello server")
    console.log(`Running at localhost:${port}`);
});