const express = require("express");
const router = express.Router();
const {
  createSchool,
  getSingleSchool,
  updateSchool,
  deleteSchool,
} = require("../controller/schoolControllers");
const {
  authenticateRoute,
  hasRole,
} = require("../middleware/authenticateRoute");

router.use(authenticateRoute);
//Routes for various Schools
router.post("/", hasRole("admin"), createSchool);
router.get("/:id", getSingleSchool);
router.put("/:id", hasRole("admin"), updateSchool);
router.delete("/:id", hasRole("admin"), deleteSchool);

module.exports = router;
