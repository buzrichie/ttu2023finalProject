const mongoose = require("mongoose");

const FinanceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => {
          return value >= 0;
        },
        message: "Payment amount must be a positive number",
      },
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    arrears: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Finance = mongoose.model("Finance", FinanceSchema);

module.exports = Finance;
