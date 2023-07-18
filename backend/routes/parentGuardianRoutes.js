const express = require("express");
const router = express.Router();
const {
  getAllParentGuardian,
  createParentGuardian,
  getSingleParentGuardian,
  updateParentGuardian,
  deleteParentGuardian,
} = require("../controller/parentGuardianControllers");
const {
  authenticateRoute,
  hasRole,
  isOwner,
} = require("../middleware/authenticateRoute");

router.use(authenticateRoute);
//Routes for various ParentGuardians
router.get("/", hasRole("admin"), getAllParentGuardian);
router.post("/", hasRole("admin"), createParentGuardian);
router.get("/:id", isOwner || hasRole("admin"), getSingleParentGuardian);
router.put("/:id", isOwner || hasRole("admin"), updateParentGuardian);
router.delete("/:id", hasRole("admin"), deleteParentGuardian);

module.exports = router;
