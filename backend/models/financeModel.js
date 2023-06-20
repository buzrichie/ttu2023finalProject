const mongoose = require("mongoose");

const FinanceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  amountPaid: {
    type: Number,
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
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Finance = mongoose.model("Finance", FinanceSchema);

module.exports = Finance;
