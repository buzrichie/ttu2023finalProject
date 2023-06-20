const Subject = require("../models/subjectModel");

// Create or add Subject
const createSubject = async (req, res) => {
  console.log(req.body);
  const db = [];
  try {
    const Subject = await Subject.create(req.body);
    res.status(201).json(Subject);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All Subject
const getAllSubject = async (req, res) => {
  try {
    const Subjects = await Subject.find();
    res.json(Subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Subject
const getSingleSubject = async (req, res) => {
  try {
    const Subject = await Subject.findById(req.params.id);
    if (!Subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.json(Subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Subject
const updateSubject = async (req, res) => {
  try {
    const Subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.json(Subject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Subject
const deleteSubject = async (req, res) => {
  try {
    const Subject = await Subject.findByIdAndDelete(req.params.id);
    if (!Subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createSubject,
  getAllSubject,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};
