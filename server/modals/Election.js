const mongoose = require("mongoose");
const { Schema } = mongoose;

const ElectionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
  },
  votes: [
    {
      id: mongoose.Schema.Types.ObjectId,
      name: String,
      count: Number,
    },
  ],
});

const Election = mongoose.model("elections", ElectionSchema);
module.exports = Election;
