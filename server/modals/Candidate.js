const mongoose = require("mongoose");
const { Schema } = mongoose;

const CandidateSchema = new Schema({
    
});

const Candidate = mongoose.model("Candidates", CandidateSchema);
module.exports = Candidate;
