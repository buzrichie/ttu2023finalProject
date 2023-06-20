const express = require("express");
const router = express.Router();
const {
  getAllTeacher,
  createTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controller/teacherControllers");

//Routes for various Teachers
router.get("/", getAllTeacher);
router.post("/", createTeacher);
router.get("/:id", getSingleTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;
