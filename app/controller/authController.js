"use strict";
const authService = require("../service/userService");
const response =  require("../utils/responses")

exports.createUser = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await authService.registerUserService(req.body);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
}

exports.loginUser = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await authService.loginUserService(req.body);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
}