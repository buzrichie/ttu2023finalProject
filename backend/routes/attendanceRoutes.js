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
  isOwner,
} = require("../middleware/authenticateRoute");

router.use(authenticateRoute);
//Routes for various Attendances
router.get("/", isOwner || hasRole(["admin", "teacher"]), getAllAttendance);
router.post("/", hasRole(["admin", "teacher"]), createAttendance);
router.get(
  "/:id",
  isOwner || hasRole(["admin", "teacher"]),
  getSingleAttendance
);
router.put("/:id", hasRole(["admin", "teacher"]), updateAttendance);
router.delete("/:id", hasRole("admin"), deleteAttendance);

module.exports = router;
