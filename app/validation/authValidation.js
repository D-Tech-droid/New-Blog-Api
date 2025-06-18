"use strict";
const { validate } = require("../utils/helper")
const Joi = require("joi");

    
exports.registerUser = async (body) => {
    let schema = {
        firstName: Joi.string().required().trim(),
        lastName: Joi.string().required().trim(),
        email: Joi.string().email().required().trim(),
        phoneNumber: Joi.string().required().trim(),
        password: Joi.string().min(8).max(15).required()
    }
    return validate(schema, body);
}

exports.loginUser = async (body) => {
    let schema = {
        email: Joi.string().email().required().trim(),
        password: Joi.string().min(8).max(15).required()
    }
    return validate(schema, body);
}   
