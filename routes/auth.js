//Importing Express
const express = require("express");

//Creating the router
const router = express.Router();

//Importing Middleware
const authMiddleware = require("../middleware/auth");

//Importing Controller
const authController = require("../controllers/auth");

//Signup Route
router.post("/signup", authController.postSignup);

//Login Route
router.post("/login", authController.postLogin);

//Logout Route
router.post("/logout", authController.postLogout);

//Exporting the router
module.exports = router;
