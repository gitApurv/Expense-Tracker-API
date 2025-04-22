const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

//Importing Middlewares
const bodyParser = require("body-parser");

//Importing Routes
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cookieParser());

//Routes
app.use(authRoutes);
app.use(expenseRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
