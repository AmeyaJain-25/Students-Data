const User = require("../models/user.js"); //Importing User from User Schema

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not Found in DB",
      });
    }
    req.userData = user;
    req.userData.salt = undefined;
    req.userData.encry_password = undefined;
    req.userData.createdAt = undefined;
    req.userData.updatedAt = undefined;
    next();
  });
};

exports.getUser = (req, res) => {
  return res.json(req.userData);
};
