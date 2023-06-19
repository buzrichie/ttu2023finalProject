const express = require("express");
const router = express.Router();
const {
  getAllAdmission,
  createAdmission,
  getSingleAdmission,
  updateAdmission,
  deleteAdmission,
} = require("../controller/admissionController");

//Routes for various Admissions
router.get("/", getAllAdmission);
router.post("/", createAdmission);
router.get("/:id", getSingleAdmission);
router.put("/:id", updateAdmission);
router.delete("/:id", deleteAdmission);

module.exports = router;
