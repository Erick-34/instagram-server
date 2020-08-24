const mongoose = require("mongoose");
const passport = require("passport");
const express = require("express");

const route = express.Router();

route.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/feed",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});
