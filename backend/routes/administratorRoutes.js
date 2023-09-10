const express = require("express");
const router = express.Router();

const {
  getAllAdmins,
  login,
  createAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controller/administratorControllers");
const {
  authenticateRoute,
  hasRole,
} = require("../middleware/authenticateRoute");

// Define the routes

router.post("/", authenticateRoute, hasRole("admin"), createAdmin);
router.post("/login", login);
router.use(authenticateRoute);
router.use(hasRole("admin"));
router.get("/", getAllAdmins);
router.get("/:id", getSingleAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
