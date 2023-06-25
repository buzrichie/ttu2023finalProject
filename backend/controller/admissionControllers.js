const Admission = require("../models/admissionModel");
const Student = require("../models/studentModel");
const AcademicLevel = require("../models/academicLevelModel");

// Create or add admission
const createAdmission = async (req, res) => {
  try {
    const { _Student, enrolledClass } = req.body;

    if (!enrolledClass) {
      return res.status(400).json({ error: "Class Required" });
    }

    const academicLevel = await AcademicLevel.findOne({
      level: enrolledClass,
    });

    if (!academicLevel) {
      return res.status(400).json({ error: "Class Not Available" });
    }

    // Query for Student Data only if it is provided in the request body
    const student = _Student
      ? await Student.findOne({
          fullName: _Student,
        })
      : null;

    // Create Admission depending on Data found
    const admission = new Admission({
      academicLevel,
      student,
      ...req.body,
    });

    await admission.save(); // Save the admission document

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
