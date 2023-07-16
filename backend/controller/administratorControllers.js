const Admin = require("../models/admintratorModel");
const bcrypt = require("bcrypt");
const generateJWT = require("../utils/jwtGenerator");

// Controller to create a new admin
const createAdmin = async (req, res) => {
  try {
    if (!firstName) {
      return res.status(400).json({ error: "Firstname required" });
    }
    if (!surName) {
      return res.status(400).json({ error: "Surname required" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email reqiured" });
    }
    // Generate numerical string and password
    const adminID = await generateNumericalString();
    const password = await generateRandomPassword(12);
    const admin = await Admin.create({ ...req.body, adminID, password });

    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Login
const login = async (req, res) => {
  try {
    const { adminID, password } = req.body;
    if (!adminID) {
      return res.status(400).json({ error: "Admin ID Number Required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password Required" });
    }
    const admin = await Admin.findOne({ adminID });
    if (!admin) {
      return res.status(201).json({ error: "Invalid Admin ID number" });
    }
    //Authenticate the Password
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(201).json({ error: "Not a valid Password" });
    }
    //Genete a Jwt Token
    const payload = { id: admin._id, role: admin.role };
    const token = generateJWT(payload, process.env.SECRET);

    // Send the admin object without including the password
    const adminWithoutPassword = { ...admin._doc };
    delete adminWithoutPassword.password;
    console.log({ admin: adminWithoutPassword, token });
    return res.status(201).json({ admin: adminWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Controller to get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get a single admin by ID
const getSingleAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.json(admin);
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
    res.json(admin);
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
    res.sendStatus(204);
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
