const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    maxlength: 15,
  },
  emailAddress: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z][a-zA-Z0-9]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi.test(
          value
        );
      },
      message: "Invalid email format",
    },
  },
  principal: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  enrollment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enrollment",
    },
  ],
  academicLevels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicLevel",
    },
  ],
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const School = mongoose.model("School", SchoolSchema);

module.exports = School;
