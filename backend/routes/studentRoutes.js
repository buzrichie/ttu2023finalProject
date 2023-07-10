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

//Routes for various Students
router.get("/", getAllStudents);
router.post("/", createStudent);
router.post("/login", login);
router.get("/:id", getSingleStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
