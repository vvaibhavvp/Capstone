
const mongoose = require("mongoose");

const { MONGODB_URL} = process.env;

exports.connect = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () =>
    console.log("Database Connected Successfully."))
    .catch((error) => {
        console.log(`Database Connection Failed.`);
        console.log(error);
        process.exit(1);
    })
}