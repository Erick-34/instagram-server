const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: { type: String, required: true },
  image: String,
  imagePublicId: String,
  coverImage: String,
  coverImagePublicId: String,
  isOnline: { type: Boolean, default: false },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "Follow" }],
  following: [{ type: Schema.Types.ObjectId, ref: "Follow" }],
  notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("user", userModel);
