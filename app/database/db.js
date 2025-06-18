"use strict";
const mongoose = require("mongoose");
mongoose.set("debug", true);

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DATABASE CONNECTED");
    }catch (error) {
        console.error(error);
        process.exit(1);
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("DATABASE DISCONNECTED");
});

module.exports = connectDB;
