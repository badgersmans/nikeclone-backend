import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors'
import userRouter from './src/Routes/UserRoutes.js';
import productRouter from './src/Routes/ProductRoutes.js';
import cookieParser from "cookie-parser";


dotenv.config()

const app = express();
const port = process.env.PORT || 4000
const db = process.env.DB_URL

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(cookieParser());


// Ensure the db URL is provided
if (!db) {
    console.error("DB_URL is not defined in .env");
    process.exit(1); // Exit the application if DB_URL is not found
}

// Connect to MongoDB using Mongoose
mongoose.connect(db)
    .then(() => {
        console.log("Connected to MongoDB ✅");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });


app.get('/', (req, res) => {
    res.send('hello from server!')
})

app.listen(port, () => {
    console.log(`APP STARTING ON PORT ✅✅✅✅ ${port}`)
})