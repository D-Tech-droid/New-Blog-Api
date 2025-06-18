"use strict";
const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const path = require("path");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const connectDB = require("./app/database/db");

dotenv.config({});
const app = express();
connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

app.use("/v1/auth", authRoutes);
app.use("/v1/blog",blogRoutes );



app.use((err, req, res, next) => {
    return res.status(err.status || StatusCodes.NOT_FOUND)
        .json({error: err.message});
});


app.use((err, req, res, next) => {
    console.log("Error", err);
    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json({error: err.message});
});


const port = process.env.PORT || 8000

app.listen(port,()=>{
 console.log(`Server is running on port ${port}`)
})
