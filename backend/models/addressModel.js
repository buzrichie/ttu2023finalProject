const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
