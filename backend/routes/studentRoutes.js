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
} = require("../middleware/authenticateRoute");

router.post("/login", login);
router.use(authenticateRoute);
//Routes for various Students
router.get("/", hasRole("admin"), getAllStudents);
router.post("/", createStudent);
router.get("/:id", getSingleStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
