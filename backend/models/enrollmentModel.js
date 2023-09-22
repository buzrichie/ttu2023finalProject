const mongoose = require("mongoose");
const hashPassword = require("../utils/passwordHash");

const EnrollmentSchema = new mongoose.Schema({
  admissionNumber: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 20,
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
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  role: {
    type: String,
    lowercase: true,
    required: [true, "Please add the role"],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  state: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  country: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  wpsAddress: {
    type: String,
    required: true,
    trim: true,
    maxlength: 11,
    validate: {
      validator: (value) => {
        return /^[A-Z]{2}-\d{3}-\d{4}$/gi.test(value);
      },
      message: "Invalid zip code format",
    },
  },
  parentGuardianFirstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  parentGuardianSurName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  parentGuardianEmail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100,
    lowercase: true,
    validate: {
      validator: (value) => {
        return /^\S+@\S+\.\S+$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  parentGuardianPhone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 20,
  },
  parentGuardianOccupation: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  admission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admission",
    unique: true,
    required: true,
  },
  academicLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicLevel",
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
});

// Pre-Save Hook: This function will be executed before saving the student data
EnrollmentSchema.pre("save", async function (next) {
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

// Post-Save Hook: This function will be executed after saving the student data
EnrollmentSchema.post("save", function (doc, next) {
  // Perform any post-processing tasks or additional operations here

  next(); // Call next() to move to the next middleware in the save process
});

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);

module.exports = Enrollment;
