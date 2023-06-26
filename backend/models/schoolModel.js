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
    validate: {
      validator: function (value) {
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
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
