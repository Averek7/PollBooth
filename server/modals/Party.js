const mongoose = require("mongoose");
const { Schema } = mongoose;

const PartySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Party = mongoose.model("parties", PartySchema);
module.exports = Party;
