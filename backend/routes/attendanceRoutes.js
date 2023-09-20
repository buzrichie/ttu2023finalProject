const express = require("express");
const router = express.Router();
const {
  getAllAttendance,
  createAttendance,
  getSingleAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controller/attendanceControllers");
const {
  authenticateRoute,
  hasRole,
  isOwnerOrAdminOrTeacher,
} = require("../middleware/authenticateRoute");

router.use(authenticateRoute);
//Routes for various Attendances
router.get("/", isOwnerOrAdminOrTeacher, getAllAttendance);
router.post("/", hasRole(["admin", "teacher"]), createAttendance);
router.get("/:id", isOwnerOrAdminOrTeacher, getSingleAttendance);
router.put("/:id", hasRole(["admin", "teacher"]), updateAttendance);
router.delete("/:id", hasRole("admin"), deleteAttendance);

module.exports = router;
