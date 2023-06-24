const mongoose = require("mongoose");

const ParentSchema = new mongoose.Schema({
  name: {
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
    maxlength: 100,
    validate: {
      validator: (value) => {
        return /^\S+@\S+\.\S+$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  occupation: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  student: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  ],
});

const Parent = mongoose.model("Parent", ParentSchema);

module.exports = Parent;
