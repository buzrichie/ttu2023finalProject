const express = require("express");
const router = express.Router();
const {
  getAllAddress,
  createAddress,
  getSingleAddress,
  updateAddress,
  deleteAddress,
} = require("../controller/addressControllers");

//Routes for various Addresss
router.get("/", getAllAddress);
router.post("/", createAddress);
router.get("/:id", getSingleAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

module.exports = router;
