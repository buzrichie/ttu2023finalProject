const mongoose = require("mongoose");

const AcademicLevelSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: true,
    },
    // school: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "School",
    //   required: true,
    // },
    student: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    subject: [
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
