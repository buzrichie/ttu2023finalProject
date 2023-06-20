const Admission = require("../models/admissionModel");

// Create or add admission
const createAdmission = async (req, res) => {
  console.log(req.body);
  const db = [];
  try {
    const admission = await Admission.create(req.body);
    res.status(201).json(admission);
    // const admissionDb = await db.push(req.body);
    // res.status(201).json(db.map((admi) => admi));
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
