import mongoose from "mongoose";

const Schema = mongoose.Schema;

const followSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Follow", followSchema);
