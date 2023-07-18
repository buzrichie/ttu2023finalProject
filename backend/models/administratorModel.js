const mongoose = require("mongoose");
const hashPassword = require("../utils/passwordHash");

const AdminSchema = new mongoose.Schema(
  {
    adminID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 20,
    },
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
      maxlength: 255,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z][a-zA-Z0-9]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi.test(
            value
          );
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    role: {
      type: String,
      required: [true, "Please add the Role"],
    },
  },
  { timestamps: true }
);

// Pre-Save Hook: This function will be executed before saving the administrator data
AdminSchema.pre("save", async function (next) {
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

// Post-Save Hook: This function will be executed after saving the administrator data
AdminSchema.post("save", function (doc, next) {
  // Perform any post-processing tasks or additional operations here

  next(); // Call next() to move to the next middleware in the save process
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
