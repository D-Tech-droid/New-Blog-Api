"use strict";
const jwt = require("jsonwebtoken");
const {StatusCodes} = require("http-status-codes");
const User = require("../models/user");

const auth = async (req, res, next) => {
  const authHeader = req.header.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized"});
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('password');
    next()
  }catch(err) {
    res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid Token"})
  }
};


module.exports = auth;