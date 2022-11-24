const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  aadhar: {
    type: Number,
    unique: true,
  },
  party: {
    type: String,
  },
  is_admin: {
    type: Boolean,
  },
  election_id: {
    type: Array,
  },
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
