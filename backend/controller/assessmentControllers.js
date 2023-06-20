const express = require("express");
const router = express.Router();
const {
  getAllAssessment,
  createAssessment,
  getSingleAssessment,
  updateAssessment,
  deleteAssessment,
} = require("../controller/assessmentController");

//Routes for various Assessments
router.get("/", getAllAssessment);
router.post("/", createAssessment);
router.get("/:id", getSingleAssessment);
router.put("/:id", updateAssessment);
router.delete("/:id", deleteAssessment);

module.exports = router;
