const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  created: String,
});

module.exports = mongoose.model("User", UserSchema);
