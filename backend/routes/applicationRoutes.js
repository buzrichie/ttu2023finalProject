const express = require("express");
const router = express.Router();
const {
  getAllApplication,
  createApplication,
  getSingleApplication,
  updateApplication,
  deleteApplication,
} = require("../controller/applicationControllers");
const {
  authenticateRoute,
  hasRole,
  isOwnerOrAdmin,
} = require("../middleware/authenticateRoute");

router.post("/", createApplication);
router.use(authenticateRoute);
//Routes for various Applications
router.get("/", hasRole("admin"), getAllApplication);
router.get("/:id", isOwnerOrAdmin, getSingleApplication);
router.put("/:id", isOwnerOrAdmin, updateApplication);
router.delete("/:id", hasRole("admin"), deleteApplication);

module.exports = router;
