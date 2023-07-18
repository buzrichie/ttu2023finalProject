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
  isOwner,
} = require("../middleware/authenticateRoute");

router.use(authenticateRoute);

//Routes for various Addresss
router.get("/", isOwner, getAllAddress);
router.post("/", hasRole("admin"), createAddress);
router.get("/:id", isOwner || hasRole("admin"), getSingleAddress);
router.put("/:id", isOwner || hasRole("admin"), updateAddress);
router.delete("/:id", hasRole("admin"), deleteAddress);

module.exports = router;
