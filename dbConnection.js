
const mongoose = require("mongoose");
require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;
//const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://pateldarshikaj:Capstone@cluster0.x7e1b.mongodb.net/CampingDB?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URL) {
    console.error("MongoDB URL is not set in the environment variables.");
    process.exit(1); 
}

exports.connect = () => {
    mongoose.connect(MONGODB_URL)
    .then( () =>
    console.log("Database Connected Successfully."))
    .catch((error) => {
        console.log(`Database Connection Failed.`);
        console.log(error);
        process.exit(1);
    })
}