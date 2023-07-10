const express = require("express");
const router = express.Router();
const {
  getAllEnrolls,
  login,
  createEnroll,
  getSingleEnroll,
  updateEnroll,
  deleteEnroll,
} = require("../controller/enrollmentControllers");

//Routes for various Enrolls
router.get("/", getAllEnrolls);
router.post("/", createEnroll);
router.post("/login", login);
router.get("/:id", getSingleEnroll);
router.put("/:id", updateEnroll);
router.delete("/:id", deleteEnroll);

module.exports = router;
