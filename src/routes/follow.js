const { Follow, User } = require("../models/index");
const express = require("express");
const router = express.Router();

const idUser = req.session.currentUser._id;

router.post("/follow", async (req, res) => {
  const { follower } = req.body;

  const response = await Follow.create({
    user: idUser,
    follower: follower,
  });

  const Following = await User.updateOne(
    { _id: idUser },
    { $push: { following: response.follower } }
  );

  res.status(200).json(Following);
});

router.get("/followers", async (req, res) => {
  const responseFollowers = await User.findOne({ _id: idUser });
  res.status(200).json(responseFollowers.followers);
});

module.exports = router;
