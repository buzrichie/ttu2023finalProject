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
  isOwner,
} = require("../middleware/authenticateRoute");

router.post("/", createApplication);
router.use(authenticateRoute);
//Routes for various Applications
router.get("/", hasRole("admin"), getAllApplication);
router.get("/:id", isOwner || hasRole("admin"), getSingleApplication);
router.put("/:id", isOwner || hasRole("admin"), updateApplication);
router.delete("/:id", hasRole("admin"), deleteApplication);

module.exports = router;
