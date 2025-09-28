const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const allRouter = require("./router/userRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const helmet = require('helmet');

mongoose
  .connect("mongodb://127.0.0.1:27017/unknown")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err.message);
  });

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true, // Important for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", allRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
