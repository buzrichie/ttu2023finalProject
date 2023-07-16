const express = require("express");
const router = express.Router();
const {
  getAllEnrolls,
  login,
  createEnroll,
  getSingleEnroll,
  updateEnroll,
  deleteEnroll,
} = require("../controller/enrollmentControllers");
const {
  authenticateRoute,
  hasRole,
  isOwner,
} = require("../middleware/authenticateRoute");

router.post("/", createEnroll);
router.post("/login", login);
router.use(authenticateRoute);
//Routes for various Enrolls
router.get("/", hasRole("admin"), getAllEnrolls);
router.get("/:id", hasRole("admin") || isOwner, getSingleEnroll);
router.put("/:id", hasRole("admin") || isOwner, updateEnroll);
router.delete("/:id", hasRole("admin"), deleteEnroll);

module.exports = router;
