const express = require("express");
const router = express.Router();
const {
  getAllFinance,
  createFinance,
  getSingleFinance,
  updateFinance,
  deleteFinance,
} = require("../controller/financeControllers");
const {
  authenticateRoute,
  hasRole,
  isOwner,
} = require("../middleware/authenticateRoute");

router.use(authenticateRoute);
//Routes for various Finances
router.get("/", hasRole("admin"), getAllFinance);
router.post("/", hasRole("admin"), createFinance);
router.get("/:id", isOwner || hasRole("admin"), getSingleFinance);
router.put("/:id", hasRole("admin"), updateFinance);
router.delete("/:id", hasRole("admin"), deleteFinance);

module.exports = router;
