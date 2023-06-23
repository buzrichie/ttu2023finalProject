const mongoose = require("mongoose");

const ParentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
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
  phone: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
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
