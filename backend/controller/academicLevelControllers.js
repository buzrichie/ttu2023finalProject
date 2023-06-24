const AcademicLevel = require("../models/academicLevelModel");

// Create or add AcademicLevel
const createAcademicLevel = async (req, res) => {
  try {
    const academicLevel = await AcademicLevel.create(req.body);
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
    res.json(academicLevels);
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
