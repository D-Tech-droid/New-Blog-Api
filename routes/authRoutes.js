"use strict";
const express = require("express");
const controller =require("../app/controller/authController")
const router = express.Router();

router.post('/register', controller.createUser);

router.post('/login', controller.loginUser);


module.exports = router;