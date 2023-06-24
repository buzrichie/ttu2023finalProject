const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  createStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/studentControllers");

//Routes for various Students
router.get("/", getAllStudents);
router.post("/", createStudent);
router.get("/:id", getSingleStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
