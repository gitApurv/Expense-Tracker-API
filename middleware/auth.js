//Importing jwt
const jwt = require("jsonwebtoken");

//Importing dotenv
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  //Getting the token from the cookies
  const token = req.cookies.token;

  //Checking if the token is provided
  if (!token) return res.status(401).json({ message: "No token provided" });

  //Verifying the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //Checking if the token is invalid
    if (err) return res.status(403).json({ message: "Invalid token" });

    //Setting the user
    req.user = user;

    //Calling the next middleware
    next();
  });
};
