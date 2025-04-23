//Importing Model
const User = require("../models/user");

//Importing bcrypt
const bcrypt = require("bcrypt");

//Importing jwt
const jwt = require("jsonwebtoken");

//Importing dotenv
const dotenv = require("dotenv");
dotenv.config();

//Signup Controller
exports.postSignup = async (req, res, next) => {
  //Getting the username and password from the request body
  const { username, password } = req.body;

  try {
    //Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Creating a new user
    const user = new User({
      username: username,
      password: hashedPassword,
    });

    //Saving the user
    await user.save();

    //Sending the response
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    //Checking if the username already exists
    if (err.code === 11000) {
      //Sending the response
      return res.status(409).json({
        message: "Username already exists",
      });
    } else {
      //Sending the response
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};

//Login Controller
exports.postLogin = async (req, res, next) => {
  //Getting the username and password from the request body
  const { username, password } = req.body;

  //Finding the user
  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(401).json({
      message: "User not found",
    });
  }

  //Comparing the password
  const isMatch = await bcrypt.compare(password, user.password);

  //Checking if the password is incorrect
  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  //Generating a JWT token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  //Setting the cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 3600000,
  });

  //Sending the response
  res.status(200).json({
    message: "Login successful",
  });
};

//Logout Controller
exports.postLogout = (req, res, next) => {
  //Clearing the cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 3600000,
  });

  //Sending the response
  res.status(200).json({
    message: "Logout successful",
  });
};
