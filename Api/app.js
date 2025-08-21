const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const allRouter = require("./router/userRouter")
const cors = require("cors")
mongoose.connect("mongodb://127.0.0.1:27017/mydatabase").then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err.message)
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", allRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

