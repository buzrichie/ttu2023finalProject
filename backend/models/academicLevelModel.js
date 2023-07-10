const mongoose = require("mongoose");

const AcademicLevelSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
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
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
  },
  { timestamps: true }
);

const AcademicLevel = mongoose.model("AcademicLevel", AcademicLevelSchema);

module.exports = AcademicLevel;
