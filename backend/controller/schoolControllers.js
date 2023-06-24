const School = require("../models/schoolModel");

// Create or add School
const createSchool = async (req, res) => {
  const db = [];
  try {
    const School = await School.create(req.body);
    res.status(201).json(School);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get Single School
const getSingleSchool = async (req, res) => {
  try {
    const School = await School.findById(req.params.id);
    if (!School) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json(School);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update School
const updateSchool = async (req, res) => {
  try {
    const School = await School.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!School) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json(School);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete School
const deleteSchool = async (req, res) => {
  try {
    const School = await School.findByIdAndDelete(req.params.id);
    if (!School) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json({ message: "School deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createSchool,
  getSingleSchool,
  updateSchool,
  deleteSchool,
};
