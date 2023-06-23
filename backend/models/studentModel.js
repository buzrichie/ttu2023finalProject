const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  admission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admission",
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  parentGuardian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParentGuardian",
  },
  academicLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicLevel",
    // required: true,
  },
  subject: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  ],
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
