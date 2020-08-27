const { Comment, Post } = require("../models/index");
const express = require("express");
const router = express.Router();

router.post("/comment", async (req, res) => {
  const { post, comment } = req.body;
  const idUser = req.session.currentUser._id;

  const resposeCreatePost = await Comment.create({
    comment,
    post,
    author: idUser,
  });

  await Post.updateOne(
    { _id: post },
    { $push: { comments: resposeCreatePost } }
  ).populate("Post");

  res.status(200).json({ success: true, data: resposeCreatePost });
});

module.exports = router;
