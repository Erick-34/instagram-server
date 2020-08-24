import mongoose from "mongoose";

const followSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

exports.modules = mongoose.model("Follow", followSchema);
