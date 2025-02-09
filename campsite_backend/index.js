import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user_route.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.ATLAS_URI;
try{
    mongoose.connect(URI);
    console.log("Connected to mongoDB");
} catch(error){
    console.log("Error: ", error);
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//defining routes
app.use("/user",userRoute);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

