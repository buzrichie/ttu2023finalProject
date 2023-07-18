const express = require("express");
const router = express.Router();
const {
  getAllAssessment,
  createAssessment,
  getSingleAssessment,
  updateAssessment,
  deleteAssessment,
} = require("../controller/assessmentControllers");
const {
  authenticateRoute,
  hasRole,
  isOwner,
} = require("../middleware/authenticateRoute");

router.use(authenticateRoute);
//Routes for various Assessments
router.get("/", isOwner || hasRole(["admin", "teacher"]), getAllAssessment);
router.post("/", hasRole(["admin", "teacher"]), createAssessment);
router.get(
  "/:id",
  isOwner || hasRole(["admin", "teacher"]),
  getSingleAssessment
);
router.put("/:id", hasRole(["admin", "teacher"]), updateAssessment);
router.delete("/:id", hasRole(["admin", "teacher"]), deleteAssessment);

module.exports = router;
