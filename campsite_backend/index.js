const http = require("http");
require('dotenv').config();
require("./dbConnection").connect();
const express = require('express');
const User = require("./models/User");

const app = express();
app.use(express.json());

app.get("/", (req,res) => {
    res.send("<h1>Server is working</h1>")
})

const PORT = process.env.PORT || 7000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})