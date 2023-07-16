const express = require("express");
const router = express.Router();
const {
  getAllSubjects,
  createSubject,
  getSingleSubject,
  updateSubject,
  deleteSubject,
} = require("../controller/subjectControllers");
const {
  authenticateRoute,
  hasRole,
} = require("../middleware/authenticateRoute");

router.use(authenticateRoute);
//Routes for various Subjects
router.get("/", getAllSubjects);
router.post("/", hasRole("admin"), createSubject);
router.get("/:id", getSingleSubject);
router.put("/:id", hasRole("admin"), updateSubject);
router.delete("/:id", hasRole("admin"), deleteSubject);

module.exports = router;
