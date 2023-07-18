const Enrollment = require("../models/enrollmentModel");
const Admission = require("../models/admissionModel");
const AcademicLevel = require("../models/academicLevelModel");
const School = require("../models/schoolModel");
const generateRandomPassword = require("../utils/passwordGenerator");
const generateNumericalString = require("../utils/numericalStringGenerator");
const generateJWT = require("../utils/jwtGenerator");

// Create or add Student
const createEnroll = async (req, res) => {
  let admission;
  let enrolledStudent;
  try {
    const {
      firstName,
      surName,
      dateOfBirth,
      gender,
      street,
      wpsAddress,
      country,
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
      return res.status(400).json({ error: "Firstname required" });
    }
    if (!surName) {
      return res.status(400).json({ error: "Surname required" });
    }
    if (!dateOfBirth) {
      return res.status(400).json({ error: "Date of Birth required" });
    }
    if (!_AcademicLevel) {
      return res.status(400).json({ error: "Class required" });
    }
    if (!gender) {
      return res.status(400).json({ error: "Gender required" });
    }
    if (!parentGuardianFirstName) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Firstname required" });
    }
    if (!parentGuardianSurName) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Surname required" });
    }
    if (!parentGuardianEmail) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Email required" });
    }
    if (!parentGuardianPhone) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Phone required" });
    }
    if (!parentGuardianOccupation) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Occupation required" });
    }
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

    // Query for Admission Data
    const academicLevel = await AcademicLevel.findOne({
      level: _AcademicLevel.toUpperCase(),
    });
    if (!academicLevel) {
      return res.status(400).json({ error: "Class Not Available" });
    }
    // Generate numerical string and password
    const admissionNumber = await generateNumericalString();
    const password = await generateRandomPassword(8);

    admission = await Admission.create({
      academicLevel,
      admissionNumber,
      password,
      school: academicLevel.school._id,
    });
    if (!admission) {
      return res.status(500).json({ error: "Admission Creation Failed" });
    }
    // Add Student to db

    enrolledStudent = await Enrollment.create({
      admissionNumber: admission.admissionNumber,
      admission: admission._id,
      academicLevel: academicLevel._id,
      school: admission.school._id,
      ...req.body,

      gender: gender.toLowerCase(),
    });
    if (!enrolledStudent) {
      await Admission.findByIdAndDelete(admission._id);
      return res.status(500).json({ error: "Failed to Enroll Student" });
    }

    //Updating Fields
    //Update Admission enrollment(Enrolled student) field
    admission.enrollment = enrolledStudent._id;
    admission = await admission.save();
    if (!admission) {
      await Enrollment.findByIdAndDelete(enrolledStudent._id);
      return res.status(500).json({ error: "Failed to Enroll Student" });
    }

    // Query for School Data
    const school = await School.findById(enrolledStudent.school);
    if (!school) {
      await Enrollment.findByIdAndDelete(enrolledStudent._id);
      return res.status(400).json({ error: "School Not Found" });
    }
    //Update Schools enrollment(Enrolled student) field
    school.enrollment.push(enrolledStudent);
    const savedSchool = await school.save();

    if (!savedSchool) {
      await Enrollment.findByIdAndDelete(enrolledStudent._id);
      return res.status(500).json({ error: "Failed to Enroll Student" });
    }

    //Genete a jwt Token
    const payload = {
      id: enrolledStudent._id,
      admission: enrolledStudent.admission,
    };
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
      // Delete the Addition record from the database
      await Admission.findByIdAndDelete(admission._id);
    }
    if (enrolledStudent) {
      // Delete the student record from the database
      await Enrollment.findByIdAndDelete(enrolledStudent._id);
    }
    console.log(error);
    res.status(400).json(error);
  }
};

//Login
const login = async (req, res) => {
  try {
    const { admissionNumber, password } = req.body;
    if (!admissionNumber) {
      return res.status(400).json({ error: "Student ID Number Required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password Required" });
    }
    const student = await Enrollment.findOne({ admissionNumber });
    if (!student) {
      return res.status(201).json({ error: "Invalid Enrollment ID number" });
    }
    //Authenticate the Password
    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return res.status(201).json({ error: "Not a valid Password" });
    }
    //Genete a Jwt Token
    const payload = { id: student._id, admission: student.admission };
    const token = generateJWT(payload, process.env.SECRET);

    // Send the student object without including the password
    const studentWithoutPassword = { ...student._doc };
    delete studentWithoutPassword.password;
    console.log({ student: studentWithoutPassword, token });
    return res.status(201).json({ student: studentWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Get All Students
const getAllEnrolls = async (req, res) => {
  try {
    const students = await Enrollment.find();
    res.json(students);
    console.log({ students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Student
const getSingleEnroll = async (req, res) => {
  try {
    const student = await Enrollment.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
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
