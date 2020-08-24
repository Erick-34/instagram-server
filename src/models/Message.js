import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: String,
  seen: {
    type: Boolean,
    default: false,
  },
});

exports.modules = mongoose.model("Message", messageSchema);