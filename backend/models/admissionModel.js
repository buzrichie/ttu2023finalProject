const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema(
  {
    admissionNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
      lowercase: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    enrollment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enrollment",
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
  },
  { timestamps: true }
);

// Pre-Save Hook: This function will be executed before saving the admission data
AdmissionSchema.pre("save", function (next) {
  // Add any pre-processing logic or data validation here before saving
  // For example, you can sanitize the input fields or perform additional validation checks

  next(); // Call next() to proceed with the save operation
});

// Post-Save Hook: This function will be executed after saving the admission data
AdmissionSchema.post("save", function (doc, next) {
  // Perform any post-processing tasks or additional operations here

  next(); // Call next() to move to the next middleware in the save process
});

const Admission = mongoose.model("Admission", AdmissionSchema);

module.exports = Admission;
