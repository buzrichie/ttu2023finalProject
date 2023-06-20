const express = require("express");
const router = express.Router();
const {
  getAllParentGuardian,
  createParentGuardian,
  getSingleParentGuardian,
  updateParentGuardian,
  deleteParentGuardian,
} = require("../controller/parentGuardianControllers");

//Routes for various ParentGuardians
router.get("/", getAllParentGuardian);
router.post("/", createParentGuardian);
router.get("/:id", getSingleParentGuardian);
router.put("/:id", updateParentGuardian);
router.delete("/:id", deleteParentGuardian);

module.exports = router;
