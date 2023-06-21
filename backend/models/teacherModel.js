const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
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
  dateOfBirth: {
    type: Date,
    required: true,
  },
  subject: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  ],
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
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  teachingExperience: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: "Please enter a valid teaching experience (a positive number).",
    },
  },
  subject: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
