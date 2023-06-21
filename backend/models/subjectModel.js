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
        required: true,
      },
    ],
    student: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
    ],
    teacher: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
