const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

require("../models/User");
const userModel = mongoose.model("userModel");

module.exports = (passport) => {
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        userModel.findOne({ email: email }).then((user) => {
          if (!user) {
            return done(
              null,
              false,
              {
                message: "está conta não existe! crie uma conta",
              },
              bcrypt.compare(password, user.passworrd, (err, batem) => {
                if (batem) {
                  return done(null, user);
                } else {
                  return done(null, false, { message: "Password invalido!" });
                }
              })
            );
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
