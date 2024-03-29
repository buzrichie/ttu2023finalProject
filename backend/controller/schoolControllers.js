const School = require("../models/schoolModel");
const Subject = require("../models/subjectModel");
const AcademicLevel = require("../models/academicLevelModel");
const Student = require("../models/studentModel");
const Teacher = require("../models/teacherModel");
const Address = require("../models/addressModel");
const Admin = require("../models/administratorModel");
const generateNumericalString = require("../utils/numericalStringGenerator");
const generateRandomPassword = require("../utils/passwordGenerator");
// Create or add School
const createSchool = async (req, res) => {
  try {
    const {
      _AcademicLevel,
      _Student,
      _Teacher,
      _Subject,
      schoolName,
      phoneNumber,
      emailAddress,
      principal,
      street,
      wpsAddress,
      state,
      city,
    } = req.body;

    if (!schoolName) {
      return res.status(400).json({ error: "School Name required" });
    }
    if (!phoneNumber) {
      return res.status(400).json({ error: "School Phone required" });
    }
    if (!emailAddress) {
      return res.status(400).json({ error: "School Email required" });
    }
    if (!principal) {
      return res.status(400).json({ error: "School Principal required" });
    }
    // if (!country) {
    //   return res.status(400).json({ error: "Street required" });
    // }
    if (!state) {
      return res.status(400).json({ error: "Street required" });
    }
    if (!city) {
      return res.status(400).json({ error: "Street required" });
    }
    if (!street) {
      return res.status(400).json({ error: "Street required" });
    }
    if (!wpsAddress) {
      return res.status(400).json({ error: "Street required" });
    }
    //Add Address to db
    const address = await Address.create({ street, wpsAddress, state, city });
    if (!address) {
      return res.status(500).json({ error: "Address Creation Failed" });
    }
    // Query for Academic Level Data only if provided in request body
    const academicLevel = _AcademicLevel
      ? await AcademicLevel.findOne({ _id: _AcademicLevel })
      : null;

    // Query for Subject Data only if provided in request body
    const subject = _Subject ? await Subject.findOne({ _id: _Subject }) : null;

    // Query for Student Data only if provided in request body
    const student = _Student ? await Student.findOne({ _id: _Student }) : null;

    // Query for Teacher Data only if provided in request body
    const teacher = _Teacher ? await Teacher.findOne({ _id: _Teacher }) : null;

    // Create School depending on Data found
    const school = await School.create({
      ...req.body,
      academicLevel,
      student,
      teacher,
      address,
      subject,
    });

    if (!school) {
      return res.status(400).json({ error: "School Not Created" });
    }

    // Generate numerical string and password
    const id = await generateNumericalString("AD");
    const password = await generateRandomPassword(12);

    const admin = await Admin.create({
      name: principal,
      id,
      password,
      school,
      email: emailAddress,
      role: "admin",
    });

    school.admin = admin._id;

    // Send the admin object without including the password
    const adminWithoutPassword = { ...admin._doc };
    delete adminWithoutPassword.password;

    // return res.status(201).json({ admin: adminWithoutPassword, password });
    const updateSchool = await school.save();
    if (!updateSchool) {
      await School.findByIdAndDelete(school._id);
      await Admin.findByIdAndDelete(admin._id);
      throw new Error("Admin data could not be linked to school");
    }
    res.status(201).json({ school, admin: adminWithoutPassword, password });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get Single School
const getSingleSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);

    if (!school) {
      return res.status(404).json({ error: "School not found" });
    }
    res.status(201).json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update School
const updateSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!school) {
      return res.status(404).json({ error: "School not found" });
    }
    res.status(201).json(school);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete School
const deleteSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) {
      return res.status(404).json({ error: "School not found" });
    }
    res.status(201).json({ message: "School deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createSchool,
  getSingleSchool,
  updateSchool,
  deleteSchool,
};
