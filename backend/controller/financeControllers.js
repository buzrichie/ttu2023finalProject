const Finance = require("../models/financeModel");
const Student = require("../models/studentModel");

// Create or add Finance
const createFinance = async (req, res) => {
  try {
    const { _Student, balance, amount, type, arrears } = req.body;

    if (!_Student) {
      return res.status(400).json({ error: "Student Required" });
    }
    if (!amount) {
      return res.status(400).json({ error: "Amount Required" });
    }
    if (!type) {
      return res.status(400).json({ error: "Payment Type Required" });
    }
    if (!balance) {
      return res.status(400).json({ error: "Balance Required" });
    }
    if (!arrears) {
      return res.status(400).json({ error: "Arrears Required" });
    }

    // Query for Student Data
    const student = await Student.findOne({
      fullName: _Student,
    });
    if (!student) {
      return res.status(400).json({ error: "Student Not Found" });
    }

    // Create Payment
    const finance = await Finance.create({
      ...req.body,
      student,
    });
    res.status(201).json(finance);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All Finance
const getAllFinance = async (req, res) => {
  try {
    const finances = await Finance.find().sort({ createdAt: -1 });
    return res.status(201).json(finances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Finance
const getSingleFinance = async (req, res) => {
  try {
    const finance = await Finance.findById(req.params.id);
    if (!finance) {
      return res.status(404).json({ error: "Finance not found" });
    }
    return res.status(201).json(finance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Finance
const updateFinance = async (req, res) => {
  try {
    const finance = await Finance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!finance) {
      return res.status(404).json({ error: "Finance not found" });
    }
    return res.status(201).json(finance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Finance
const deleteFinance = async (req, res) => {
  try {
    const finance = await Finance.findByIdAndDelete(req.params.id);
    if (!finance) {
      return res.status(404).json({ error: "Finance not found" });
    }
    return res.status(201).json({ message: "Finance deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createFinance,
  getAllFinance,
  getSingleFinance,
  updateFinance,
  deleteFinance,
};
