const mongoose = require("mongoose");

const AcademicLevelSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
  },
  { timestamps: true }
);

const AcademicLevel = mongoose.model("AcademicLevel", AcademicLevelSchema);

module.exports = AcademicLevel;
