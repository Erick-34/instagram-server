const { Post, User } = require("../models/index");
const express = require("express");
const router = express.Router();

router.post("/post/create", async (req, res) => {
  const { title, image } = req.body;
  const IdUser = req.session.currentUser._id;

  try {
    if (!title || !image) {
      res.status(400).json({
        message: "Please provide all informations",
      });
    }

    const response = await Post.create({
      title,
      image,
      author: IdUser,
    });

    await User.updateOne(
      { _id: req.session.currentUser._id },
      { $push: { posts: response } }
    ).populate("Post");

    res.status(201).json({ success: true, data: response });
  } catch (err) {
    console.log(`Error while creating a new  post ${err}`);
  }
});

router.get("/posts", async (req, res) => {
  const post = await Post.find();
  res.status(200).json({ success: true, data: post });
});

module.exports = router;
