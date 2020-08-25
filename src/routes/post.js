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

    const imgUser = await User.findOne({ _id: IdUser }, { image });

    console.log(imgUser);

    const response = await Post.create({
      title,
      image,
      imagePublicId: imgUser,
      author: IdUser,
    });

    await User.updateOne(
      { _id: req.session.currentUser._id },
      { $push: { posts: response._id } }
    );

    res.status(201).json({ ...response });
  } catch (err) {
    console.log(`Error while creating a new  post ${err}`);
  }
});

router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.status(200).json({
    success: true,
    data: posts,
  });
});

module.exports = router;
