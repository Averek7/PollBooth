const mongoose = require("mongoose");
const { Schema } = mongoose;

const VoterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  father_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    length: 10,
    unique: true,
  },
  aadhar: {
    type: Number,
    required: true,
    length: 12,
    unique: true,
  },
});

const Voter = mongoose.model("voters", VoterSchema);
module.exports = Voter;
