const express = require("express");
const authController = require("../controller/auth.controller.js");
const refreshToken  = require("../controller/token.controller.js");
const details = require("../controller/user.controller.js");
const auth = require("../middleware/auth.js");
const imageController = require("../controller/image.controller");


const router = express.Router();

const routes = (app) => {

    // auth
    router.post("/signUp", authController.signUp);
    router.post("/logIn", authController.logIn);
    router.get("/logOut", authController.logOut);

    // refresh token
    router.post("/refreshToken", refreshToken)

    router.get("/details", auth, details)

    // image
    router.post("/upload", imageController.upload);
    router.get("/files/:name", imageController.download);
    router.get("/files", imageController.getListFiles);

    app.use(router);
}

module.exports = routes