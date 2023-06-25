const Address = require("../models/addressModel");
const ParentGuardian = require("../models/parentGuardianModel");
const Student = require("../models/studentModel");
const Teacher = require("../models/teacherModel");

// Create or add Address
const createAddress = async (req, res) => {
  try {
    const {
      _Student,
      _Teacher,
      _ParentGuardian,
      street,
      wpsAddress,
      country,
      state,
      city,
    } = req.body;

    if (!street) {
      return res.status(400).json({ error: "Street required" });
    }
    if (!country) {
      return res.status(400).json({ error: "Street required" });
    }
    if (!state) {
      return res.status(400).json({ error: "Street required" });
    }
    if (!city) {
      return res.status(400).json({ error: "Street required" });
    }
    if (!wpsAddress) {
      return res.status(400).json({ error: "Street required" });
    }
    // Query for Parent Guardian Data only if provided in request body
    const parentGuardian = _ParentGuardian
      ? await ParentGuardian.findOne({
          fullName: _ParentGuardian,
        })
      : null;

    // Query for Student Data only if it provided in request body
    const student = _Student
      ? await Student.findOne({
          fullName: _Student,
        })
      : null;

    // Query for Teacher Data only if it provided in request body
    const teacher = _Teacher
      ? await Teacher.findOne({
          fullName: _Teacher,
        })
      : null;

    // Create Address depending on Data found
    const address = await Address.create({
      student,
      teacher,
      parentGuardian,
      ...req.body,
    });
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All Address
const getAllAddress = async (req, res) => {
  try {
    const addresss = await Address.find();
    res.status(201).json(addresss);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Address
const getSingleAddress = async (req, res) => {
  try {
    const Address = await Address.findById(req.params.id);
    if (!Address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json(Address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Address
const updateAddress = async (req, res) => {
  try {
    const Address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json(Address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Address
const deleteAddress = async (req, res) => {
  try {
    const Address = await Address.findByIdAndDelete(req.params.id);
    if (!Address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createAddress,
  getAllAddress,
  getSingleAddress,
  updateAddress,
  deleteAddress,
};
