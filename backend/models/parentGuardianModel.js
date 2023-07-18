const mongoose = require("mongoose");

const ParentGuardianSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 100,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z][a-zA-Z0-9]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi.test(
          value
        );
      },
      message: "Invalid email format",
    },
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 20,
  },
  occupation: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  ],
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
});

const ParentGuardian = mongoose.model("ParentGuardian", ParentGuardianSchema);

module.exports = ParentGuardian;
