import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

exports.module = mongoose.model("Like", likeSchema);
