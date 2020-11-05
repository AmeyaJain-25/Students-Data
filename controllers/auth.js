const User = require("../models/user.js");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

//---------------------
//SIGN UP
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ err: "Not able to save the user in DB" });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

//---------------------
//SIGN IN
exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: "USER Email Doesn't Exist",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password Doesn't match",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });

    const { _id, name, email, role } = user;
    res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

//---------------------
//SIGN OUT
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "USER SIGNOUT SUCCESFULLY",
  });
};

//----------------------
//PROTECTED ROUTES

//Authentication for Sign In
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//----------------------
//CUSTOM MIDDLEWARE

exports.isAuthenticated = (req, res, next) => {
  let checker = req.userData && req.auth && req.userData._id == req.auth._id;
  if (!checker) {
    console.log(req.userData, req.auth, req.auth._id);

    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.userData.role === 0) {
    res.status(403).json({
      error: "You aren't ADMIN. Access Denied",
    });
  }
  next();
};
