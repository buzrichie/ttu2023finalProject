const express = require("express");
const router = express.Router();
const {
  createSchool,
  getSingleSchool,
  updateSchool,
  deleteSchool,
} = require("../controller/schoolControllers");

//Routes for various Schools
router.post("/", createSchool);
router.get("/:id", getSingleSchool);
router.put("/:id", updateSchool);
router.delete("/:id", deleteSchool);

module.exports = router;
