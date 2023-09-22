const mongoose = require("mongoose");
const hashPassword = require("../utils/passwordHash");

const StudentSchema = new mongoose.Schema(
  {
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
      maxlength: 50,
    },
    surName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      lowercase: true,
      required: [true, "Please add the role"],
    },
    admission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admission",
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    academicLevel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicLevel",
      required: true,
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    parentGuardian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParentGuardian",
    },
  },
  { timestamps: true }
);

// Pre-Save Hook: This function will be executed before saving the student data
StudentSchema.pre("save", async function (next) {
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
StudentSchema.post("save", function (doc, next) {
  // Perform any post-processing tasks or additional operations here

  next(); // Call next() to move to the next middleware in the save process
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
