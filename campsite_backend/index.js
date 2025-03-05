import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user_route.js";
import AdminRoute from "./routes/admin_route.js";
import path from 'path';
// import campsiteRoute from "./routes/campsite_route.js";

const app = express();
app.use(cors());
app.use(express.json());
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use('/images', express.static(path.join(__dirname, '../campsite-booking/public/images')));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

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
app.use("/admin",AdminRoute);
// app.use("/campsites", campsiteRoute);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

