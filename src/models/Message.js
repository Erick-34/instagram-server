const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
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

module.exports = mongoose.model("Message", messageSchema);
