const { User } = require("../models/index");
const bcryptjs = require("bcryptjs");
const passport = require("passport");
const express = require("express");
const router = express.Router();

const saltRounds = 10;

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/feed",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const { fullName, email, username, password } = req.body;

  if (!fullName || !email || !username || !password) {
    res.status(404).json({ message: "prencha todos os campos" });
    return;
  }
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if (!regex.test(password)) {
    res.status(500).json({
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }
  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        fullName,
        email,
        username: username,
        password: hashedPassword,
      });
    })
    .then((userFromDB) => {
      console.log("Newly created user is: ", userFromDB);
      res.status(200).json(userFromDB);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
