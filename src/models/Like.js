const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  post: String,
  user: String,
});

module.exports = mongoose.model("Like", likeSchema);
