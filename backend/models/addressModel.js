const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
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
      required: true,
      trim: true,
      maxlength: 50,
    },
    wpsAddress: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10,
      validate: {
        validator: (value) => {
          return /^[A-Z]{2}-\d{3}-\d{4}$/.test(value);
        },
        message: "Invalid zip code format",
      },
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    parentGuardian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParentGuardian",
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
