const Attendance = require("../models/attendanceModel");
const Student = require("../models/studentModel");
const Teacher = require("../models/teacherModel");

// Create or add Attendance
const createAttendance = async (req, res) => {
  try {
    const { _Student, _Teacher, status, date } = req.body;

    if (!_Teacher) {
      return res.status(400).json({ error: "Teacher required" });
    }
    if (!_Student) {
      return res.status(400).json({ error: "Student required" });
    }
    if (!date) {
      return res.status(400).json({ error: "Date required" });
    }
    if (
      !status ||
      !["Present", "Absent", "Late"].map((a) =>
        a.toLowerCase.includes(status.toLowerCase)
      )
    ) {
      return res.status(400).json({ error: "Invalid status" });
    }
    // Query for Student Data
    const student = await Student.findOne({
      fullName: _Student,
    });
    if (!student) {
      return res.status(400).json({ error: "Student Not Found" });
    }
    // Query for Teacher Data
    const teacher = await Teacher.findOne({
      fullName: _Teacher,
    });
    if (!teacher) {
      return res.status(400).json({ error: "Teacher Not Found" });
    }

    // Create Payment
    const attendance = await Attendance.create({
      student,
      teacher,
      status,
    });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

//Get All Attendance
const getAllAttendance = async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Attendance
const getSingleAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Attendance
const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!attendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }
    res.json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Attendance
const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) {
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
