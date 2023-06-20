const Attendance = require("../models/attendanceModel");

// Create or add Attendance
const createAttendance = async (req, res) => {
  console.log(req.body);
  const db = [];
  try {
    const Attendance = await Attendance.create(req.body);
    res.status(201).json(Attendance);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All Attendance
const getAllAttendance = async (req, res) => {
  try {
    const Attendances = await Attendance.find();
    res.json(Attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Attendance
const getSingleAttendance = async (req, res) => {
  try {
    const Attendance = await Attendance.findById(req.params.id);
    if (!Attendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }
    res.json(Attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Attendance
const updateAttendance = async (req, res) => {
  try {
    const Attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!Attendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }
    res.json(Attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Attendance
const deleteAttendance = async (req, res) => {
  try {
    const Attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!Attendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }
    res.json({ message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createAttendance,
  getAllAttendance,
  getSingleAttendance,
  updateAttendance,
  deleteAttendance,
};
