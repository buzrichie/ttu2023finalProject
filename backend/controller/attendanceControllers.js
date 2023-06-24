const Attendance = require("../models/attendanceModel");
const Student = require("../models/studentModel");

// Create or add Attendance
const createAttendance = async (req, res) => {
  try {
    const { _Student, status } = req.body;

    // Query for Student Data
    const student = await Student.findOne({
      fullName: _Student,
    });

    if (!status || !["Present", "Absent", "Late"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    // Create Payment
    if (student && status) {
      const attendance = await Attendance.create({
        student,
        status,
      });
      res.status(201).json(attendance);
    }
  } catch (error) {
    res.status(500).json(error);
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
