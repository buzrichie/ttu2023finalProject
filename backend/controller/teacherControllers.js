const Teacher = require("../models/teacherModel");

// Create or add Teacher
const createTeacher = async (req, res) => {
  try {
    const Teacher = await Teacher.create(req.body);
    res.status(201).json(Teacher);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All Teacher
const getAllTeacher = async (req, res) => {
  try {
    const Teachers = await Teacher.find();
    res.json(Teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Teacher
const getSingleTeacher = async (req, res) => {
  try {
    const Teacher = await Teacher.findById(req.params.id);
    if (!Teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json(Teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Teacher
const updateTeacher = async (req, res) => {
  try {
    const Teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json(Teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Teacher
const deleteTeacher = async (req, res) => {
  try {
    const Teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!Teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createTeacher,
  getAllTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
};
