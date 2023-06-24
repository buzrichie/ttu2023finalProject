const Assessment = require("../models/assessmentModel");
const Subject = require("../models/subjectModel");
const Student = require("../models/studentModel");

// Create or add Assessment
const createAssessment = async (req, res) => {
  try {
    const { _Subject, _Student } = req.body;

    // Query for Subject Data
    const subject = await Subject.findOne({
      name: _Subject,
    });
    // Query for Student Data
    const student = await Student.findOne({
      fullName: _Student,
    });

    // Create Assessment
    if (subject && student) {
      const assessment = await Assessment.create({
        student,
        subject,
        ...req.body,
      });
      res.status(201).json(assessment);
    }
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All Assessment
const getAllAssessment = async (req, res) => {
  try {
    const Assessments = await Assessment.find();
    res.json(Assessments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Assessment
const getSingleAssessment = async (req, res) => {
  try {
    const Assessment = await Assessment.findById(req.params.id);
    if (!Assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }
    res.json(Assessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Assessment
const updateAssessment = async (req, res) => {
  try {
    const Assessment = await Assessment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!Assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }
    res.json(Assessment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Assessment
const deleteAssessment = async (req, res) => {
  try {
    const Assessment = await Assessment.findByIdAndDelete(req.params.id);
    if (!Assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }
    res.json({ message: "Assessment deleted successfully" });
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
