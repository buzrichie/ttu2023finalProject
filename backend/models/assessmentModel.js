const mongoose = require("mongoose");

const AssessmentSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const Assessment = mongoose.model("Assessment", AssessmentSchema);

module.exports = Assessment;
