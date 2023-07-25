const express = require("express");
const userRoute = express.Router();

const {httpRegistration, httpLogin} = require("../controllers/user.controller");

userRoute.post("/register", httpRegistration);
userRoute.post("/login", httpLogin);

module.exports = userRoute;
