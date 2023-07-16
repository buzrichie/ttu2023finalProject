const express = require("express");
const router = express.Router();
const {
  getAllAcademicLevel,
  createAcademicLevel,
  getSingleAcademicLevel,
  updateAcademicLevel,
  deleteAcademicLevel,
} = require("../controller/academicLevelControllers");
const {
  authenticateRoute,
  hasRole,
} = require("../middleware/authenticateRoute");

router.use(authenticateRoute);
//Routes for various AcademicLevels
router.get("/", getAllAcademicLevel);
router.post("/", hasRole("admin"), createAcademicLevel);
router.get("/:id", getSingleAcademicLevel);
router.put("/:id", hasRole("admin"), updateAcademicLevel);
router.delete("/:id", hasRole("admin"), deleteAcademicLevel);

module.exports = router;
