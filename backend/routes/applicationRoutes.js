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
router.get("/:id", hasRole("admin") || isOwner, getSingleApplication);
router.put("/:id", hasRole("admin") || isOwner, updateApplication);
router.delete("/:id", hasRole("admin"), deleteApplication);

module.exports = router;
