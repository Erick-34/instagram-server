const { Comment } = require("../models/index");
const express = require("express");
const router = express.Router();

const idUser = req.session.currentUser._id;

router.post("/comment", async (req, res) => {
  const { post, comment } = req.body;

  const resposeCreatePost = await Comment.create({
    comment: comment,
    post: post,
    author: idUser,
  });

  res.status(200).json(resposeCreatePost);
});
