const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postModel = new Schema({
  title: String,
  image: String,
  imagePublicId: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("userModel", postModel);
