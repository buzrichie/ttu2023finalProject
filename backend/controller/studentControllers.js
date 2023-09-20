const Student = require("../models/studentModel");
const Subject = require("../models/subjectModel");
const Admission = require("../models/admissionModel");
const Enrollment = require("../models/enrollmentModel");
const AcademicLevel = require("../models/academicLevelModel");
const Address = require("../models/addressModel");
const School = require("../models/schoolModel");
const ParentGuardian = require("../models/parentGuardianModel");
const generateRandomPassword = require("../utils/passwordGenerator");
const generateNumericalString = require("../utils/numericalStringGenerator");
const bcrypt = require("bcrypt");
const generateJWT = require("../utils/jwtGenerator");

/**
 * Create or add a student.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const createStudent = async (req, res) => {
  let address;
  let student;
  let parentGuardian;

  try {
    // Request body field checks
    const { admissionNumber, admissionStatus } = req.body;

    if (!admissionNumber) {
      return res.status(400).json({ error: "Admission Number is required." });
    }
    if (!admissionStatus) {
      return res.status(400).json({ error: "Status is required." });
    }

    // Query for Admission Data
    const admission = await Admission.findOne({ admissionNumber });

    if (!admission) {
      return res.status(400).json({ error: "Admission not available." });
    }
    if (admissionStatus === "declined" && admission.status === "declined") {
      return res.status(400).json({ error: "Student already declined." });
    }

    // Decline Admission
    if (admissionStatus === "declined") {
      admission.status = "declined";
      const declined = await admission.save();
      if (!declined) {
        return res
          .status(400)
          .json({ error: "Student Admission Decline failed" });
      }
      return res
        .status(201)
        .json({ message: "Student Admission Declined", student });
    }

    if (admission.status === "approved") {
      return res.status(400).json({ error: "Student already admitted." });
    }

    // Query for Enrolled Student Data
    const enrolledStudent = await Enrollment.findById(admission.enrollment._id);

    if (!enrolledStudent) {
      return res
        .status(400)
        .json({ error: "Student information not available." });
    }

    // Extract required fields from enrolled student data
    const {
      gender,
      firstName,
      surName,
      dateOfBirth,
      street,
      wpsAddress,
      state,
      city,
      parentGuardianFirstName,
      parentGuardianSurName,
      parentGuardianEmail,
      parentGuardianPhone,
      parentGuardianOccupation,
    } = enrolledStudent;

    // Enrolled Student Data field checks
    if (!firstName) {
      return res.status(400).json({ error: "Firstname is required." });
    }
    if (!surName) {
      return res.status(400).json({ error: "Surname is required." });
    }
    if (!dateOfBirth) {
      return res.status(400).json({ error: "Date of Birth is required." });
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

    // Generate numerical string and password
    const id = await generateNumericalString("ST");
    const password = await generateRandomPassword(10);

    // Create Address
    address = await Address.create({
      street,
      wpsAddress,
      state,
      city,
    });

    if (!address) {
      return res.status(500).json({ error: "Failed to create address." });
    }

    // Create Student
    student = await Student.create({
      firstName,
      surName,
      dateOfBirth,
      admission: enrolledStudent.admission,
      gender,
      school: enrolledStudent.school,
      academicLevel: enrolledStudent.academicLevel,
      role: "STUDENT",
      id,
      password,
      address,
    });

    if (!student) {
      await Address.findByIdAndDelete(address._id);
      return res.status(500).json({ error: "Failed to create student." });
    }

    // Create Parent/Guardian
    parentGuardian = await ParentGuardian.create({
      firstName: parentGuardianFirstName,
      surName: parentGuardianSurName,
      email: parentGuardianEmail,
      phone: parentGuardianPhone,
      occupation: parentGuardianOccupation,
      address,
      student,
    });

    if (!parentGuardian) {
      await Student.findByIdAndDelete(student._id);
      await Address.findByIdAndDelete(address._id);
      return res
        .status(500)
        .json({ error: "Failed to create parent/guardian." });
    }

    // Update relationships between models
    student.parentGuardian = parentGuardian._id;
    address.student = student._id;
    address.parentGuardian = parentGuardian._id;

    await Promise.all([student.save(), address.save()]);

    // Query for School Data
    const school = await School.findById(student.school);

    if (!school) {
      await Student.findByIdAndDelete(student._id);
      await Address.findByIdAndDelete(address._id);
      await ParentGuardian.findByIdAndDelete(parentGuardian._id);
      return res.status(400).json({ error: "School not found." });
    }

    school.students.push(student);
    await school.save();

    // Query for Academic Level Data
    const academicLevel = await AcademicLevel.findById(student.academicLevel);

    if (!academicLevel) {
      await Student.findByIdAndDelete(student._id);
      await Address.findByIdAndDelete(address._id);
      await ParentGuardian.findByIdAndDelete(parentGuardian._id);
      return res.status(400).json({ error: "Class not found." });
    }

    academicLevel.students.push(student);
    await academicLevel.save();

    // Assign student subjects by looping through academic level subjects
    for (const academicLevelSubject of academicLevel.subjects) {
      student.subjects.push(academicLevelSubject);
    }

    await student.save();

    // Query for student subjects in Subjects Database
    const subjects = await Subject.find({ _id: { $in: student.subjects } });

    if (!subjects) {
      await Student.findByIdAndDelete(student._id);
      await Address.findByIdAndDelete(address._id);
      await ParentGuardian.findByIdAndDelete(parentGuardian._id);
      return res.status(400).json({ error: "Subjects not found." });
    }

    // Associate student with subjects
    for (const subject of subjects) {
      subject.students.push(student);
      await subject.save();
    }

    admission.status = admissionStatus;
    await admission.save();

    // Send the student object without including the password
    const studentWithoutPassword = { ...student._doc };
    delete studentWithoutPassword.password;

    console.log({ student: studentWithoutPassword, password });
    return res.status(201).json({ student: studentWithoutPassword, password });
  } catch (error) {
    if (address) {
      // Delete the Address record from the database
      await Address.findByIdAndDelete(address._id);
    }
    if (student) {
      // Delete the Student record from the database
      await Student.findByIdAndDelete(student._id);
    }
    if (parentGuardian) {
      // Delete the ParentGuardian record from the database
      await ParentGuardian.findByIdAndDelete(parentGuardian._id);
    }

    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the student." });
  }
};

//Login
const login = async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Student ID Number Required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password Required" });
    }
    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(400).json({ error: "Invalid Student ID number" });
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
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate(
        "admission address school academicLevel subjects parentGuardian"
      )
      .sort({ createdAt: -1 });
    return res.status(201).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Student
const getSingleStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "admission address school academicLevel subjects parentGuardian"
    );
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    const studentWithoutPassword = { ...student._doc };
    delete studentWithoutPassword.password;
    res.status(201).json({ student: studentWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Student
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Delete Student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStudent,
  login,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
