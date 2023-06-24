const ParentGuardian = require("../models/parentGuardianModel");

// Create or add ParentGuardian
const createParentGuardian = async (req, res) => {
  try {
    const ParentGuardian = await ParentGuardian.create(req.body);
    res.status(201).json(ParentGuardian);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All ParentGuardian
const getAllParentGuardian = async (req, res) => {
  try {
    const ParentGuardians = await ParentGuardian.find();
    res.json(ParentGuardians);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single ParentGuardian
const getSingleParentGuardian = async (req, res) => {
  try {
    const ParentGuardian = await ParentGuardian.findById(req.params.id);
    if (!ParentGuardian) {
      return res.status(404).json({ error: "ParentGuardian not found" });
    }
    res.json(ParentGuardian);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update ParentGuardian
const updateParentGuardian = async (req, res) => {
  try {
    const ParentGuardian = await ParentGuardian.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!ParentGuardian) {
      return res.status(404).json({ error: "ParentGuardian not found" });
    }
    res.json(ParentGuardian);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete ParentGuardian
const deleteParentGuardian = async (req, res) => {
  try {
    const ParentGuardian = await ParentGuardian.findByIdAndDelete(
      req.params.id
    );
    if (!ParentGuardian) {
      return res.status(404).json({ error: "ParentGuardian not found" });
    }
    res.json({ message: "ParentGuardian deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createParentGuardian,
  getAllParentGuardian,
  getSingleParentGuardian,
  updateParentGuardian,
  deleteParentGuardian,
};
