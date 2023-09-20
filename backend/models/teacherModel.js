const mongoose = require("mongoose");
const hashPassword = require("../utils/passwordHash");

const TeacherSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },
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
  role: {
    type: String,
    required: [true, "Please add the role"],
  },
  dateOfBirth: {
    type: Date,
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
    lowercase: true,
    maxlength: 100,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z][a-zA-Z0-9]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi.test(
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
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    unique: true,
    required: true,
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

// Pre-Save Hook: This function will be executed before saving the teacher data
TeacherSchema.pre("save", async function (next) {
  // Add any pre-processing logic or data validation here before saving
  // For example, you can sanitize the input fields or perform additional validation checks
  if (this.isModified("password")) {
    try {
      this.password = await hashPassword(this.password);
    } catch (error) {
      throw Error("Password hashing couldn't complete");
    }
  }
  next(); // Call next() to proceed with the save operation
});

// Post-Save Hook: This function will be executed after saving the teacher data
TeacherSchema.post("save", function (doc, next) {
  // Perform any post-processing tasks or additional operations here

  next(); // Call next() to move to the next middleware in the save process
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
