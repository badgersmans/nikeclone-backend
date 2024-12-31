import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors'
import https from 'https';
import fs from 'fs';
import path from 'path';
import userRouter from './src/Routes/UserRoutes.js';
import productRouter from './src/Routes/ProductRoutes.js';
import shoeRouter from './src/Routes/ShoeRoutes.js.js';
import cookieParser from "cookie-parser";

dotenv.config()

const app = express();
const port = process.env.PORT || 4000
const db = process.env.DB_URL

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(shoeRouter);
app.use(cookieParser());

// Define the paths to your SSL certificate and key
const sslOptions = {
    key: fs.readFileSync(path.resolve('/Users/shawnlaw/localhost-key.pem')),
    cert: fs.readFileSync(path.resolve('/Users/shawnlaw/localhost.pem')),
};

// Serve the apple-app-site-association file
app.use('/.well-known/apple-app-site-association', (req, res) => {
    const associationData = {
        "webcredentials": {
            "apps": [
                "M99D5U6NPG.learning-projects.dribble-maryam-money-management"
            ]
        }
    };
    res.json(associationData);  // Send JSON response instead of file
});

// app.use('/.well-known/apple-app-site-association', (req, res) => {
//     const __dirname = path.dirname(new URL(import.meta.url).pathname); // get current directory path
//     res.sendFile(path.resolve(__dirname, '.well-known', 'apple-app-site-association'));
// });


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
    const associationData = {
        "webcredentials": {
            "apps": [
                "M99D5U6NPG.learning-projects.dribble-maryam-money-management"
            ]
        }
    };
    res.json(associationData);  // Send JSON response instead of the "hello from server!" message
});

app.listen(port, () => {
    console.log(`APP STARTING ON PORT ✅✅✅✅ ${port}`)
})

// Start the HTTPS server
// https.createServer(sslOptions, app).listen(port, () => {
//     console.log(`App is running on https://localhost:${port}`);
// });