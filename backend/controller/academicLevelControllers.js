const AcademicLevel = require("../models/academicLevelModel");
const Student = require("../models/studentModel");
const Subject = require("../models/subjectModel");

// Create or add AcademicLevel
const createAcademicLevel = async (req, res) => {
  try {
    const { _Student, _Subject } = req.body;

    // Query for Subject Data only if provided in request body
    const subject = _Subject
      ? await Subject.findOne({
          name: _Subject,
        })
      : null;

    // Query for Student Data only if it provided in request body
    const student = _Student
      ? await Student.findOne({
          fullName: _Student,
        })
      : null;

    // Create AcademicLevel depending on Data found
    const academicLevel = await AcademicLevel.create({
      student,
      subject,
      ...req.body,
    });

    res.status(201).json(academicLevel);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All AcademicLevel
const getAllAcademicLevel = async (req, res) => {
  try {
    const academicLevels = await AcademicLevel.find();
    res.status(201).json(academicLevels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single AcademicLevel
const getSingleAcademicLevel = async (req, res) => {
  try {
    const AcademicLevel = await AcademicLevel.findById(req.params.id);
    if (!AcademicLevel) {
      return res.status(404).json({ error: "AcademicLevel not found" });
    }
    res.json(AcademicLevel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update AcademicLevel
const updateAcademicLevel = async (req, res) => {
  try {
    const AcademicLevel = await AcademicLevel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!AcademicLevel) {
      return res.status(404).json({ error: "AcademicLevel not found" });
    }
    res.json(AcademicLevel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete AcademicLevel
const deleteAcademicLevel = async (req, res) => {
  try {
    const AcademicLevel = await AcademicLevel.findByIdAndDelete(req.params.id);
    if (!AcademicLevel) {
      return res.status(404).json({ error: "AcademicLevel not found" });
    }
    res.json({ message: "AcademicLevel deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createAcademicLevel,
  getAllAcademicLevel,
  getSingleAcademicLevel,
  updateAcademicLevel,
  deleteAcademicLevel,
};
