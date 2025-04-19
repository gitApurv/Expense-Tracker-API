const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//Importing Middlewares
const bodyParser = require("body-parser");

//Importing Routes
const authRoutes = require("./routes/auth");

const app = express();

//Middleware
app.use(bodyParser.json());

//Routes
app.use(authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
