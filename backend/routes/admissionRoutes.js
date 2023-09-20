const express = require("express");
const router = express.Router();
const {
  getAllAdmission,
  createAdmission,
  getSingleAdmission,
  updateAdmission,
  deleteAdmission,
} = require("../controller/admissionControllers");
const {
  authenticateRoute,
  hasRole,
  isOwnerOrAdmin,
} = require("../middleware/authenticateRoute");

router.use(authenticateRoute);

//Routes for various Admissions
router.get("/", hasRole("admin"), getAllAdmission);
router.post("/", hasRole("admin"), createAdmission);
router.get("/:id", isOwnerOrAdmin, getSingleAdmission);
router.put("/:id", hasRole("admin"), updateAdmission);
router.delete("/:id", hasRole("admin"), deleteAdmission);

module.exports = router;
