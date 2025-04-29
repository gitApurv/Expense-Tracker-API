const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//Importing Middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//Importing Routes
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");

//Creating the express app
const app = express();
app.use(cors());

//Using Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

//Using Routes
app.use(authRoutes);
app.use(expenseRoutes);

//Error Handling Middleware
app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
  });
});

//Connecting to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //Starting the server
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
