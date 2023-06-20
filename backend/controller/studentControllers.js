const Student = require("../models/studentModel");

// Create or add Student
const createStudent = async (req, res) => {
  console.log(req.body);
  const db = [];
  try {
    const Student = await Student.create(req.body);
    res.status(201).json(Student);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All Student
const getAllStudent = async (req, res) => {
  try {
    const Students = await Student.find();
    res.json(Students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Student
const getSingleStudent = async (req, res) => {
  try {
    const Student = await Student.findById(req.params.id);
    if (!Student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(Student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Student
const updateStudent = async (req, res) => {
  try {
    const Student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(Student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Student
const deleteStudent = async (req, res) => {
  try {
    const Student = await Student.findByIdAndDelete(req.params.id);
    if (!Student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
