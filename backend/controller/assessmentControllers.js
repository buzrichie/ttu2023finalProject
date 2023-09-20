const Assessment = require("../models/assessmentModel");
const Subject = require("../models/subjectModel");
const Student = require("../models/studentModel");
const Teacher = require("../models/teacherModel");

// Create or add Assessment
const createAssessment = async (req, res) => {
  try {
    const { _Subject, _Student, _Teacher, name, score } = req.body;

    if (!_Subject) {
      return res.status(400).json({ error: "Subject required" });
    }
    if (!_Student) {
      return res.status(400).json({ error: "Student required" });
    }
    if (!_Teacher) {
      return res.status(400).json({ error: "Teacher required" });
    }
    if (!name) {
      return res.status(400).json({ error: "Name required" });
    }
    if (!score) {
      return res.status(400).json({ error: "Score required" });
    }
    // Query for Subject Data
    const subject = await Subject.findOne({
      name: _Subject,
    });
    if (!subject) {
      return res.status(400).json({ error: "Subject Not Available" });
    }
    // Query for Student Data
    const student = await Student.findOne({
      fullName: _Student,
    });
    if (!student) {
      return res.status(400).json({ error: "Student Not Found" });
    }
    // Query for Teacher Data
    const teacher = await Teacher.findOne({
      fullName: _Teacher,
    });
    if (!teacher) {
      return res.status(400).json({ error: "Teacher Not Found" });
    }
    // Create Assessment
    const assessment = await Assessment.create({
      ...req.body,
      student,
      subject,
      teacher,
    });
    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get All Assessment
const getAllAssessment = async (req, res) => {
  try {
    const assessments = await Assessment.find();
    return res.status(201).json(assessments).sort({ createdAt: -1 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Assessment
const getSingleAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }
    return res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Assessment
const updateAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }
    return res.status(201).json(assessment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Assessment
const deleteAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndDelete(req.params.id);
    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }
    return res.status(201).json({ message: "Assessment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createAssessment,
  getAllAssessment,
  getSingleAssessment,
  updateAssessment,
  deleteAssessment,
};
