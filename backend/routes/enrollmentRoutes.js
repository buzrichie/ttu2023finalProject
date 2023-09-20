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
  isOwnerOrAdmin,
} = require("../middleware/authenticateRoute");
const {
  restrictUpdateFieldsMiddleware,
} = require("../middleware/restrictUpdateFields");

router.post("/", createEnroll);
router.post("/login", login);
router.use(authenticateRoute);
//Routes for various Enrolls
router.get("/", hasRole("admin"), getAllEnrolls);
router.get("/:id", isOwnerOrAdmin, getSingleEnroll);
router.put(
  "/:id",
  isOwnerOrAdmin,
  restrictUpdateFieldsMiddleware,
  updateEnroll
);
router.delete("/:id", hasRole("admin"), deleteEnroll);

module.exports = router;
