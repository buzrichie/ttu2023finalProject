const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gardianFullName: {
    type: String,
    required: true,
  },
  gardianEmail: {
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
  gardianPhone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Customize the validation logic for the phone field
        return /^\d{10}$/.test(value);
      },
      message: "Please enter a valid 10-digit phone number.",
    },
  },
  address: {
    type: String,
    required: true,
  },
  academicClass: {
    type: String,
    require: true,
  },
  previousSchool: {
    type: String,
  },
  continiousAssessment: {
    type: String,
  },
});

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
