const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late"],
    required: true,
  },
  remarks: {
    type: String,
  },
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;
