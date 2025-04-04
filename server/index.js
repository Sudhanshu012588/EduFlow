import dotenv from 'dotenv';
import { connectDB } from './DB/Db.config.js';
import cookieParser from 'cookie-parser';
import express from "express";
import cors from "cors";
import router from './Routes/userRouter.js'
import multer from 'multer';
import cloudinary from 'cloudinary';
const app = express();

dotenv.config({
    path: './.env'
});

app.use(cors({
    origin: process.env.CORS_ORIGIN,

}))

app.use(express.urlencoded({extended:true,limit:"16kb"})) // encoding the url
app.use(express.static("public")); // folder where we want to keep the files like pdf e.t.c;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connecting DB
connectDB()
.then(() => {
    console.log("Database connected");
})
.catch((err) => {
    console.log(`Database connection error: ${err.message}`);
})
app.use('/user/auth',router)
app.use('/user/upload',router)
const Port = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(Port, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

