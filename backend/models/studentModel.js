const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
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
  grade: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  parentName: {
    type: String,
    required: true,
  },
  parentEmail: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/.test(
          value
        );
      },
      message: "Please enter a valid parent email address.",
    },
  },
  parentPhone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Please enter a valid 10-digit phone number.",
    },
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
