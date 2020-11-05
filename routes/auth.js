const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  signout,
  signup,
  signin,
  isSignedIn,
} = require("../controllers/auth.js");

//SIGNUP ROUTE
router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name must be atleast 3 Characters"),
    check("email").isEmail().withMessage("Email is required"),
    check("password")
      .isLength({ min: 3 })
      .withMessage("Password must be atleast 3 Characters"),
  ],
  signup
);

//--------------------
//SIGN IN
router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({ min: 3 }).withMessage("Password is required"),
  ],
  signin
);

//SIGNOUT ROUTE
router.get("/signout", signout);

//IS SIGNED IN
router.get("/testRoute", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router; //Exporting all the routes
