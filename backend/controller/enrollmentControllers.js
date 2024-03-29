const Enrollment = require("../models/enrollmentModel");
const Admission = require("../models/admissionModel");
const AcademicLevel = require("../models/academicLevelModel");
const School = require("../models/schoolModel");
const generateRandomPassword = require("../utils/passwordGenerator");
const generateNumericalString = require("../utils/numericalStringGenerator");
const generateJWT = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");
/**
 * Create or add a student.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const createEnroll = async (req, res) => {
  let admission;
  let enrolledStudent;

  try {
    // Destructure request body
    const {
      firstName,
      surName,
      dateOfBirth,
      gender,
      street,
      wpsAddress,
      state,
      city,
      _AcademicLevel,
      parentGuardianFirstName,
      parentGuardianSurName,
      parentGuardianEmail,
      parentGuardianPhone,
      parentGuardianOccupation,
    } = req.body;

    // Request body field checks
    if (!firstName) {
      return res.status(400).json({ error: "Firstname is required." });
    }
    if (!surName) {
      return res.status(400).json({ error: "Surname is required." });
    }
    if (!dateOfBirth) {
      return res.status(400).json({ error: "Date of Birth is required." });
    }
    if (!_AcademicLevel) {
      return res.status(400).json({ error: "Class is required." });
    }
    if (!gender) {
      return res.status(400).json({ error: "Gender is required." });
    }
    if (!parentGuardianFirstName) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Firstname is required." });
    }
    if (!parentGuardianSurName) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Surname is required." });
    }
    if (!parentGuardianEmail) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Email is required." });
    }
    if (!parentGuardianPhone) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Phone is required." });
    }
    if (!parentGuardianOccupation) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Occupation is required." });
    }
    if (!street) {
      return res.status(400).json({ error: "Street is required." });
    }
    if (!state) {
      return res.status(400).json({ error: "State is required." });
    }
    if (!city) {
      return res.status(400).json({ error: "City is required." });
    }
    if (!wpsAddress) {
      return res.status(400).json({ error: "WPS Address is required." });
    }

    // Query for AcademicLevel Data
    const academicLevel = await AcademicLevel.findOne({
      level: _AcademicLevel.toUpperCase(),
    });
    if (!academicLevel) {
      return res.status(400).json({ error: "Class not available." });
    }

    // Generate numerical string and password
    const admissionNumber = await generateNumericalString("EN");
    const password = await generateRandomPassword(8);

    // Create Admission
    admission = await Admission.create({
      academicLevel,
      admissionNumber,
      school: academicLevel.school._id,
    });

    if (!admission) {
      return res.status(500).json({ error: "Failed to create admission." });
    }

    // Create Enrollment
    enrolledStudent = await Enrollment.create({
      ...req.body,
      id: admissionNumber,
      admissionNumber: admission.admissionNumber,
      admission: admission._id,
      academicLevel: academicLevel._id,
      school: admission.school._id,
      gender: gender.toLowerCase(),
      role: "ENROLL",
      password: password,
    });

    if (!enrolledStudent) {
      await Admission.findByIdAndDelete(admission._id);
      return res.status(500).json({ error: "Failed to enroll student." });
    }

    // Update Admission enrollment field
    admission.enrollment = enrolledStudent._id;
    admission = await admission.save();

    if (!admission) {
      await Enrollment.findByIdAndDelete(enrolledStudent._id);
      return res.status(500).json({ error: "Failed to update admission." });
    }

    // Query for School Data
    const school = await School.findById(enrolledStudent.school);

    if (!school) {
      await Enrollment.findByIdAndDelete(enrolledStudent._id);
      return res.status(400).json({ error: "School not found." });
    }

    // Update School enrollment field
    school.enrollment = enrolledStudent._id;
    const savedSchool = await school.save();

    if (!savedSchool) {
      await Enrollment.findByIdAndDelete(enrolledStudent._id);
      return res.status(500).json({ error: "Failed to update school." });
    }

    // Generate JWT Token
    const payload = { id: enrolledStudent._id, role: enrolledStudent.role };
    const token = generateJWT(payload, process.env.SECRET);

    // Send the student object without including the password
    const studentWithoutPassword = { ...enrolledStudent._doc };
    delete studentWithoutPassword.password;

    console.log({ student: studentWithoutPassword, token, password });
    return res
      .status(201)
      .json({ student: studentWithoutPassword, token, password });
  } catch (error) {
    if (admission) {
      // Delete the Admission record from the database
      await Admission.findByIdAndDelete(admission._id);
    }
    if (enrolledStudent) {
      // Delete the student record from the database
      await Enrollment.findByIdAndDelete(enrolledStudent._id);
    }
    console.log(error);
    res.status(500).json({
      error: "An error occurred while creating or enrolling the student.",
    });
  }
};

//Login
const login = async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Enrollment ID Number Required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password Required" });
    }
    const student = await Enrollment.findOne({ id });
    if (!student) {
      return res.status(400).json({ error: "Invalid Enrollment ID number" });
    }

    //Authenticate the Password
    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return res.status(400).json({ error: "Not a valid Password" });
    }

    //Genete a Jwt Token
    const payload = { id: student._id, role: student.role };
    const token = generateJWT(payload, process.env.SECRET);

    // Send the student object without including the password
    const studentWithoutPassword = { ...student._doc };
    delete studentWithoutPassword.password;
    console.log({ student: studentWithoutPassword, token });
    return res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get All Students
const getAllEnrolls = async (req, res) => {
  try {
    const students = await Enrollment.find()
      .populate("school academicLevel admission")
      .sort({ createdAt: -1 });

    res.status(201).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Student
const getSingleEnroll = async (req, res) => {
  try {
    const student = await Enrollment.findById(req.params.id).populate(
      "admission school academicLevel"
    );
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    console.log(student);
    const studentWithoutPassword = { ...student._doc };
    delete studentWithoutPassword.password;
    res.status(201).json({ enroll: studentWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Student
const updateEnroll = async (req, res) => {
  try {
    const student = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Student
const deleteEnroll = async (req, res) => {
  try {
    const student = await Enrollment.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEnroll,
  login,
  getAllEnrolls,
  getSingleEnroll,
  updateEnroll,
  deleteEnroll,
};
