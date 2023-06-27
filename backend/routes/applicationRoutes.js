const express = require("express");
const router = express.Router();
const {
  getAllApplication,
  createApplication,
  getSingleApplication,
  updateApplication,
  deleteApplication,
} = require("../controller/applicationControllers");

//Routes for various Applications
router.get("/", getAllApplication);
router.post("/", createApplication);
router.get("/:id", getSingleApplication);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

module.exports = router;
