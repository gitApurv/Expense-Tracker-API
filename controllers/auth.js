const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.postSignup = (req, res, next) => {
  const { username, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      const user = new User({
        username: username,
        password: hashedPassword,
      });
      return user.save();
    })
    .then(() => {
      res.status(201).json({
        message: "User created successfully",
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).json({
          message: "Username already exists",
        });
      } else {
        res.status(500).json({
          message: "Internal server error",
        });
      }
    });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          message: "User not found",
        });
      }
      return bcrypt.compare(password, user.password);
    })
    .then((isMatch) => {
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
      res.status(200).json({
        message: "Login successful",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
