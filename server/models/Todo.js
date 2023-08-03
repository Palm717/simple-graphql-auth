const { Schema, mongoose } = require("mongoose");

const TodoSchema = new mongoose.Schema({
  text: String,
  created: String,
  username: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
