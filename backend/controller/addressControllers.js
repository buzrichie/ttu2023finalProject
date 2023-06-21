const Address = require("../models/addressModel");

// Create or add Address
const createAddress = async (req, res) => {
  console.log(req.body);
  try {
    const address = await Address.create(req.body);
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All Address
const getAllAddress = async (req, res) => {
  try {
    const addresss = await Address.find();
    res.json(addresss);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Address
const getSingleAddress = async (req, res) => {
  try {
    const Address = await Address.findById(req.params.id);
    if (!Address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json(Address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Address
const updateAddress = async (req, res) => {
  try {
    const Address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json(Address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Address
const deleteAddress = async (req, res) => {
  try {
    const Address = await Address.findByIdAndDelete(req.params.id);
    if (!Address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createAddress,
  getAllAddress,
  getSingleAddress,
  updateAddress,
  deleteAddress,
};
