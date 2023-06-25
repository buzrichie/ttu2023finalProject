const Subject = require("../models/subjectModel");
const AcademicLevel = require("../models/academicLevelModel");
const Student = require("../models/studentModel");
const Teacher = require("../models/teacherModel");

// Create or add Subject
const createSubject = async (req, res) => {
  try {
    const { _AcademicLevel, _Student, _Teacher, name, code } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name required" });
    }
    if (!code) {
      return res.status(400).json({ error: "Code required" });
    }
    // Query for Academic Level Data only if provided in request body
    const academicLevel = _AcademicLevel
      ? await AcademicLevel.findOne({
          level: _AcademicLevel,
        })
      : null;
    console.log(academicLevel);

    // Query for Student Data only if it provided in request body
    const student = _Student
      ? await Student.findOne({
          fullName: _Student,
        })
      : null;
    console.log(student);

    // Query for Teacher Data only if it provided in request body
    const teacher = _Teacher
      ? await Teacher.findOne({
          fullName: _Teacher,
        })
      : null;
    console.log(teacher);

    // Create Subject depending on Data found
    const subject = await Subject.create({
      academicLevel,
      student,
      teacher,
      ...req.body,
    });
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//Get All Subject
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Subject
const getSingleSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
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
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};
