const express = require("express");
const router = express.Router();
const {
  getAllSubjects,
  createSubject,
  getSingleSubject,
  updateSubject,
  deleteSubject,
} = require("../controller/subjectControllers");

//Routes for various Subjects
router.get("/", getAllSubjects);
router.post("/", createSubject);
router.get("/:id", getSingleSubject);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

module.exports = router;
