const mongoose = require("mongoose");

const postModel = mongoose.Schema({
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

exports.modules = mongosse.model("userModel", postModel);
