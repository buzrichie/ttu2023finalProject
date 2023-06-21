const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema(
  {
    admissionNumber: {
      type: Number,
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
