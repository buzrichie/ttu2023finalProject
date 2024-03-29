const Admin = require("../models/administratorModel");
const School = require("../models/schoolModel");
const generateRandomPassword = require("../utils/passwordGenerator");
const generateNumericalString = require("../utils/numericalStringGenerator");
const bcrypt = require("bcrypt");
const generateJWT = require("../utils/jwtGenerator");

/**
 * Create a new admin.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const createAdmin = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    // Generate numerical string and password
    const id = await generateNumericalString();
    const password = await generateRandomPassword(12);

    const admin = await Admin.create({
      ...req.body,
      id,
      password,
      role: "admin",
    });

    // Send the admin object without including the password
    const adminWithoutPassword = { ...admin._doc };
    delete adminWithoutPassword.password;

    return res.status(201).json({ admin: adminWithoutPassword, password });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createAdmin };

//Login
const login = async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Admin ID Number Required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password Required" });
    }
    const admin = await Admin.findOne({ id });
    if (!admin) {
      return res.status(400).json({ error: "Invalid Admin ID number" });
    }
    //Authenticate the Password
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ error: "Not a valid Password" });
    }
    //Genete a Jwt Token
    const payload = { id: admin._id, role: admin.role };
    const token = generateJWT(payload, process.env.SECRET);

    // Send the admin object without including the password
    res.cookie("Authorization", token, { httpOnly: true });

    return res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Controller to get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find()
      .populate("school")
      .sort({ createdAt: -1 });
    res.status(201).json(admins);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get a single admin by ID
const getSingleAdmin = async (req, res) => {
  try {
    // const admins = await Admin.find().populate('school');
    const admin = await Admin.findById(req.params.id).populate("school");
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    const adminWithoutPassword = { ...admin._doc };
    delete adminWithoutPassword.password;
    res.status(201).json({ admin: adminWithoutPassword });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to update an admin by ID
const updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to delete an admin by ID
const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(201).json({ Deleted: admin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllAdmins,
  login,
  createAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
