const { Like, Post } = require("../models/index");
const express = require("express");
const router = express.Router();

router.post("/like", async (req, res) => {
  const { Idpost } = req.body;
  const idUser = req.session.currentUser._id;

  const resposeCreateLike = await Like.create({
    post: Idpost,
    user: idUser,
  });

  await Post.updateOne(
    { _id: Idpost },
    { $push: { likes: resposeCreateLike } }
  );

  res.status(200).json({ success: true, data: resposeCreateLike });
});

router.get("/like", async (req, res) => {
  const { post } = req.body;

  const resposeLike = await Like.find({}, { post: post }).populate("Post");
  res.status(200).json({ success: true, data: resposeLike });
});

module.exports = router;
