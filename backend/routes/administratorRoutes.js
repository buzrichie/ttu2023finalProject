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

// Define the routes
router.post("/", createAdmin);
router.post("/login", login);
router.get("/", getAllAdmins);
router.get("/:id", getSingleAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
