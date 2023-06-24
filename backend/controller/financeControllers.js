const Finance = require("../models/financeModel");
const Student = require("../models/studentModel");

// Create or add Finance
const createFinance = async (req, res) => {
  try {
    const { _Student } = req.body;
    if (!_Student) {
      return res.status(400).json({ error: "Student Required" });
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
      student,
      ...req.body,
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
    const Finances = await Finance.find();
    res.json(Finances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Finance
const getSingleFinance = async (req, res) => {
  try {
    const Finance = await Finance.findById(req.params.id);
    if (!Finance) {
      return res.status(404).json({ error: "Finance not found" });
    }
    res.json(Finance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Finance
const updateFinance = async (req, res) => {
  try {
    const Finance = await Finance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Finance) {
      return res.status(404).json({ error: "Finance not found" });
    }
    res.json(Finance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Finance
const deleteFinance = async (req, res) => {
  try {
    const Finance = await Finance.findByIdAndDelete(req.params.id);
    if (!Finance) {
      return res.status(404).json({ error: "Finance not found" });
    }
    res.json({ message: "Finance deleted successfully" });
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
