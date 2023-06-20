const express = require("express");
const router = express.Router();
const {
  getAllFinance,
  createFinance,
  getSingleFinance,
  updateFinance,
  deleteFinance,
} = require("../controller/financeControllers");

//Routes for various Finances
router.get("/", getAllFinance);
router.post("/", createFinance);
router.get("/:id", getSingleFinance);
router.put("/:id", updateFinance);
router.delete("/:id", deleteFinance);

module.exports = router;
