const { User, Post } = require("../models/index");
const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();

const saltRounds = 10;

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
        image: "https:localhsodods",
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

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.json({
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  await User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.json({
          errorMessage: "Email is not registered. Try with other email.",
        });
        return;
      }

      bcryptjs
        .compare(password, user.password)
        .then((success) => {
          if (success) {
            req.session.currentUser = user;
            return res.status(200).json(user);
          }
          res.json({ errorMessage: "Incorrect password." });
        })
        .then(() => {
          User.updateOne({ _id: user }, { $push: { isOnline: true } });
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch((error) => next(error));
});

router.get("/profile", async (req, res) => {
  const idUser = req.session.currentUser;

  const resposePosts = await Post.find({ author: idUser }).populate("User");

  res.status(200).json({ success: true, data: resposePosts });
});

//Logout
router.post("/logout", async (req, res) => {
  const response = await User.updateOne(
    { _id: req.session.currentUser },
    { $push: { isOnline: false } }
  );

  req.session.destroy();

  res.status(200).json({ message: "Loggout success", res: response });
});

module.exports = router;
