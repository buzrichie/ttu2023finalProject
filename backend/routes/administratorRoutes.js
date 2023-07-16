const express = require("express");
const router = express.Router();

const {
  getAllAdmins,
  login,
  createAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controller/admistratorControllers");

// Define the routes
router.post("/", createAdmin);
router.get("/", getAllAdmins);
router.get("/:id", getSingleAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
