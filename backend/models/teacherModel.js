const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  surName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    unique: true,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/.test(
          value
        );
      },
      message: "Please enter a valid email address.",
    },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Please enter a valid 10-digit phone number.",
    },
  },
  qualification: {
    type: String,
    required: true,
  },
  teachingExperience: {
    type: Number,
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: "Please enter a valid teaching experience (a positive number).",
    },
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  ],
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  academicLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicLevel",
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
