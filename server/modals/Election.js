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
    type: Number,
    required: true,
  },
  votes: {
    groups: [
      {
        user: mongoose.Schema.Types.ObjectId,
        count: Number,
      },
    ],
  },
});

const Election = mongoose.model("elections", ElectionSchema);
module.exports = Election;
