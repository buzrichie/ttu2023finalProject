const express = require("express");
const router = express.Router();
const {
  getAllAttendance,
  createAttendance,
  getSingleAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controller/attendanceControllers");

//Routes for various Attendances
router.get("/", getAllAttendance);
router.post("/", createAttendance);
router.get("/:id", getSingleAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

module.exports = router;
