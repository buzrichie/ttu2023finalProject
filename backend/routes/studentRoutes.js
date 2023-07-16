const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  login,
  createStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/studentControllers");
const {
  authenticateRoute,
  hasRole,
  isOwner,
} = require("../middleware/authenticateRoute");

router.post("/login", login);
router.use(authenticateRoute);
//Routes for various Students
router.get("/", hasRole("admin"), getAllStudents);
router.post("/", hasRole("admin"), createStudent);
router.get("/:id", isOwner, getSingleStudent);
router.put("/:id", isOwner || hasRole("admin"), updateStudent);
router.delete("/:id", hasRole("admin"), deleteStudent);

module.exports = router;
