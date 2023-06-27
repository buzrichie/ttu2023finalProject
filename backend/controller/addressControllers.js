const Address = require("../models/addressModel");

// Create or add Address
const createAddress = async (req, res) => {
  try {
    const { street, wpsAddress, country, state, city } = req.body;

    if (!street) {
      return res.status(400).json({ error: "Street required" });
    }
    if (!country) {
      return res.status(400).json({ error: "Country required" });
    }
    if (!state) {
      return res.status(400).json({ error: "State required" });
    }
    if (!city) {
      return res.status(400).json({ error: "City required" });
    }
    if (!wpsAddress) {
      return res.status(400).json({ error: "WPS Address required" });
    }

    // Create Address
    const address = await Address.create({
      ...req.body,
    });

    if (!address) {
      return res.status(400).json({ error: "Address Not Created" });
    }

    // Submit Address
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
    res.status(201).json(addresss);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Address
const getSingleAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Address
const updateAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Address
const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json({ message: "Address deleted successfully", address: address });
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
