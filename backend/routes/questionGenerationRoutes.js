const express = require("express");
const router = express.Router();

const {
  generateQuestion,
} = require("../controller/questionGenerationController");

router.post("/", generateQuestion);

module.exports = router;
