const express = require("express");
const router = express.Router();
const {
  getAllAddress,
  createAddress,
  getSingleAddress,
  updateAddress,
  deleteAddress,
} = require("../controller/addressControllers");
const {
  authenticateRoute,
  hasRole,
  isOwnerOrAdmin,
} = require("../middleware/authenticateRoute");

router.use(authenticateRoute);

//Routes for various Addresss
router.get("/", isOwnerOrAdmin, getAllAddress);
router.post("/", hasRole("admin"), createAddress);
router.get("/:id", isOwnerOrAdmin, getSingleAddress);
router.put("/:id", isOwnerOrAdmin, updateAddress);
router.delete("/:id", hasRole("admin"), deleteAddress);

module.exports = router;
