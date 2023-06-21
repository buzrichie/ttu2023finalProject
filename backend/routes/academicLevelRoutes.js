const express = require("express");
const router = express.Router();
const {
  getAllAcademicLevel,
  createAcademicLevel,
  getSingleAcademicLevel,
  updateAcademicLevel,
  deleteAcademicLevel,
} = require("../controller/academicLevelControllers");

//Routes for various AcademicLevels
router.get("/", getAllAcademicLevel);
router.post("/", createAcademicLevel);
router.get("/:id", getSingleAcademicLevel);
router.put("/:id", updateAcademicLevel);
router.delete("/:id", deleteAcademicLevel);

module.exports = router;
