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

// Create or add Student
const createStudent = async (req, res) => {
  let address;
  let student;
  let parentGuardian;
  try {
    // Request body field checks
    const { admissionNumber, admissionStatus } = req.body;

    if (!admissionNumber) {
      return res.status(400).json({ error: "Admission Number Required" });
    }
    if (!admissionStatus) {
      return res.status(400).json({ error: "Status Required" });
    }

    // Query for Admission Data
    const admission = await Admission.findOne({ admissionNumber });
    if (!admission) {
      return res.status(400).json({ error: "Admission Not Available" });
    }
    if (admission.status === "approved") {
      return res.status(400).json({ error: "Student Already Admitted" });
    }

    // Query for Enrolled Student Data
    const enrolledStudent = await Enrollment.findOne(admission.enrollment._id);
    if (!enrolledStudent) {
      return res
        .status(400)
        .json({ error: "Student information not Available" });
    }

    // Extract Student required field from Enrolled Student Data
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
      return res.status(400).json({ error: "Firstname required" });
    }
    if (!surName) {
      return res.status(400).json({ error: "Surname required" });
    }
    if (!dateOfBirth) {
      return res.status(400).json({ error: "Date of Birth required" });
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
    if (!state) {
      return res.status(400).json({ error: "State required" });
    }
    if (!city) {
      return res.status(400).json({ error: "City required" });
    }
    if (!wpsAddress) {
      return res.status(400).json({ error: "WPS Address required" });
    }

    // Generate numerical string and password
    const studentID = await generateNumericalString();
    const password = await generateRandomPassword(10);

    // Add Address to Database
    address = await Address.create({
      street,
      wpsAddress,
      state,
      city,
    });
    if (!address) {
      await Student.findByIdAndDelete(student._id);
      return res.status(500).json({ error: "Student Creation Failed" });
    }
    // Add Student to Database
    student = await Student.create({
      firstName: enrolledStudent.firstName,
      surName: enrolledStudent.surName,
      dateOfBirth: enrolledStudent.dateOfBirth,
      admission: enrolledStudent.admission,
      gender: enrolledStudent.gender,
      school: enrolledStudent.school,
      academicLevel: enrolledStudent.academicLevel,
      role: "STUDENT",
      studentID,
      password,
      address,
    });
    if (!student) {
      await Address.findByIdAndDelete(address._id);
      return res.status(500).json({ error: "Student Creation Failed" });
    }

    // Add Parent/Guardian to Database
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
      return res.status(500).json({ error: "Student Creation Failed" });
    }

    // Update Models fields after Creating Student
    student.parentGuardian = parentGuardian._id;
    address.student = student._id;
    address.parentGuardian = parentGuardian._id;
    address = await address.save();

    // Query for School Data
    const school = await School.findById(student.school);
    if (!school) {
      await Student.findByIdAndDelete(student._id);
      return res.status(400).json({ error: "School Not Found" });
    }
    school.students.push(student);
    await school.save();

    // Query for Academic Level Data
    const academicLevel = await AcademicLevel.findById(student.academicLevel);
    if (!academicLevel) {
      await Student.findByIdAndDelete(student._id);
      await Address.findByIdAndDelete(address._id);
      await ParentGuardian.findByIdAndDelete(parentGuardian._id);
      return res.status(400).json({ error: "Class Not Found" });
    }
    academicLevel.students.push(student);
    await academicLevel.save();

    // Assign student subjects by Looping through Class or Academic Level Subjects
    for (const academicLevelSubject of academicLevel.subjects) {
      student.subjects.push(academicLevelSubject);
      await student.save();
    }

    // Query for all student subjects in Subjects Database
    const subjects = await Subject.find({ _id: { $in: student.subjects } });
    if (!subjects) {
      await Student.findByIdAndDelete(student._id);
      await Address.findByIdAndDelete(address._id);
      await ParentGuardian.findByIdAndDelete(parentGuardian._id);
      return res.status(400).json({ error: "Subjects not found" });
    }

    // Loop through the subjects and reference the student
    for (const subject of subjects) {
      subject.students.push(student);
      await subject.save();
    }

    admission.status = admissionStatus;
    const saveAdmission = await admission.save();

    if (!saveAdmission) {
      await Student.findByIdAndDelete(student._id);
      await Address.findByIdAndDelete(address._id);
      await ParentGuardian.findByIdAndDelete(parentGuardian._id);
      return res.status(500).json({ error: "Student Creation Failed" });
    }

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
    res.status(400).json(error);
    console.log(error);
  }
};

//Login
const login = async (req, res) => {
  try {
    const { studentID, password } = req.body;
    if (!studentID) {
      return res.status(400).json({ error: "Student ID Number Required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password Required" });
    }
    const student = await Student.findOne({ studentID });
    if (!student) {
      return res.status(201).json({ error: "Invalid Student ID number" });
    }
    //Authenticate the Password
    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return res.status(201).json({ error: "Not a valid Password" });
    }
    //Genete a Jwt Token
    const payload = { id: student._id, role: student.role };
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
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(201).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Student
const getSingleStudent = async (req, res) => {
  try {
    console.log("in controller");
    console.log(req.params.id);
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
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
