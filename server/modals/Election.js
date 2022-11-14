const mongoose = require("mongoose");
const { Schema } = mongoose;

const ElectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  duration: {
    type: String, //time
    required: true,
  },
  candidate: {},
});

const Election = mongoose.model("elections", ElectionSchema);
module.exports = Election;
