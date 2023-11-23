const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const authController = require('./controllers/authController.js')
const propertyController = require('./controllers/propertyController.js')
const uploadController = require('./controllers/uploadController.js');
const userController = require("./controllers/userController.js");
const commentController = require("./controllers/commentController.js");

// db connecting
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL);
console.log("database has been connected");

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('public/images'))

app.use("/auth", authController);
app.use("/property", propertyController);
app.use('/upload', uploadController)
app.use('/user', userController)
app.use('/comment', commentController)

// starting server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server has been started"));