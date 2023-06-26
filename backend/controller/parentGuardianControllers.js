const ParentGuardian = require("../models/parentGuardianModel");
const Student = require("../models/studentModel");

// Create or add ParentGuardian
const createParentGuardian = async (req, res) => {
  try {
    const {
      parentGuardianFirstName,
      parentGuardianSurName,
      parentGuardianEmail,
      parentGuardianPhone,
      parentGuardianOccupation,
      _Student,
      address,
    } = req.body;

    if (!_Student) {
      return res.status(400).json({ error: "Student required" });
    }
    if (!parentGuardianFirstName) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Firstname required" });
    }
    if (!parentGuardianSurName) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Surname required" });
    }
    if (!parentGuardianEmail) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Email required" });
    }
    if (!parentGuardianPhone) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Phone required" });
    }
    if (!parentGuardianOccupation) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Occupation required" });
    }

    if (!address) {
      return res.status(400).json({ error: "Address required" });
    }
    // Query for Student Data
    const student = await Student.findOne({
      fullName: _Student,
    });

    if (!student) {
      return res.status(400).json({ error: "Student Not Found" });
    }
    const parentGuardian = await ParentGuardian.create({
      firstName: parentGuardianFirstName,
      surName: parentGuardianSurName,
      email: parentGuardianEmail,
      phone: parentGuardianPhone,
      occupation: parentGuardianOccupation,
      address: address,
      student,
    });

    if (!parentGuardian) {
      return res.status(400).json({ error: "Guardian Not Created" });
    }
    res.status(201).json(parentGuardian);
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
