const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    applicationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 20,
    },
    applicationDate: {
      type: Date,
      // required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-Save Hook: This function will be executed before saving the application data
ApplicationSchema.pre("save", function (next) {
  // Add any pre-processing logic or data validation here before saving
  // For example, you can sanitize the input fields or perform additional validation checks

  next(); // Call next() to proceed with the save operation
});

// Post-Save Hook: This function will be executed after saving the application data
ApplicationSchema.post("save", function (doc, next) {
  // Perform any post-processing tasks or additional operations here

  next(); // Call next() to move to the next middleware in the save process
});

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
