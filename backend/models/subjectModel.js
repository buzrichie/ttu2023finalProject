const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    academicLevel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicLevel",
      },
    ],
    student: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    teacher: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
