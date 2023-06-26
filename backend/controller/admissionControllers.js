const Admission = require("../models/admissionModel");
const School = require("../models/schoolModel");
const AcademicLevel = require("../models/academicLevelModel");

// Create or add admission
const createAdmission = async (req, res) => {
  try {
    const { _AcademicLevel, admissionDate, admissionNumber, _School } =
      req.body;

    if (!_School) {
      return res.status(400).json({ error: "School Required" });
    }
    if (!admissionNumber) {
      return res.status(400).json({ error: "Admission Number Required" });
    }
    if (!admissionDate) {
      return res.status(400).json({ error: "Admission Date Required" });
    }
    if (!_AcademicLevel) {
      return res.status(400).json({ error: "Class Required" });
    }

    const school = await School.findOne({
      schoolName: _School,
    });
    if (!school) {
      return res.status(400).json({ error: "School Invalid" });
    }
    const academicLevel = await AcademicLevel.findOne({
      level: _AcademicLevel,
    });

    if (!academicLevel) {
      return res.status(400).json({ error: "Class Not Available" });
    }

    const admission = await Admission.create({
      school,
      academicLevel,
      ...req.body,
    });

    if (!admission) {
      return res.status(400).json({ error: "Admission Not Created" });
    }
    //Submit Admission
    res.status(201).json(admission);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All Admission
const getAllAdmission = async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Admission
const getSingleAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({ error: "Admission not found" });
    }
    res.json(admission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Admission
const updateAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!admission) {
      return res.status(404).json({ error: "Admission not found" });
    }
    res.json(admission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Admission
const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndDelete(req.params.id);
    if (!admission) {
      return res.status(404).json({ error: "Admission not found" });
    }
    res.json({ message: "Admission deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createAdmission,
  getAllAdmission,
  getSingleAdmission,
  updateAdmission,
  deleteAdmission,
};
