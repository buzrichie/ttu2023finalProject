const express = require("express");
const router = express.Router();
const {
  getAllTeacher,
  login,
  createTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controller/teacherControllers");

//Routes for various Teachers
router.get("/", getAllTeacher);
router.post("/", createTeacher);
router.post("/login", login);
router.get("/:id", getSingleTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;
