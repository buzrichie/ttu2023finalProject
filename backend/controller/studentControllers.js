const Student = require("../models/studentModel");
const Subject = require("../models/subjectModel");
const Admission = require("../models/admissionModel");
const AcademicLevel = require("../models/academicLevelModel");
const { createAddress } = require("../controller/addressControllers");
const {
  createParentGuardian,
} = require("../controller/parentGuardianControllers");

// Create or add Student

const createStudent = async (req, res) => {
  try {
    const {
      _AdmissionNumber,
      _Subject,
      _AcademicLevel,
      parentGuardianFirstName,
      parentGuardianSurName,
      parentGuardianEmail,
      parentGuardianPhone,
      parentGuardianOccupation,
      gender,
      _address,
      _School,
      firstName,
      surName,
      dateOfBirth,
    } = req.body;

    //Request body field checks
    if (!firstName) {
      return res.status(400).json({ error: "Firstname required" });
    }
    if (!surName) {
      return res.status(400).json({ error: "Surname required" });
    }
    if (!dateOfBirth) {
      return res.status(400).json({ error: "Date of Birth required" });
    }
    if (!_AdmissionNumber) {
      return res.status(400).json({ error: "Admission Number required" });
    }
    if (!gender) {
      return res.status(400).json({ error: "Gender required" });
    }
    if (!_address) {
      return res.status(400).json({ error: "Address required" });
    }
    if (!_School) {
      return res.status(400).json({ error: "School required" });
    }
    if (!_AcademicLevel) {
      return res.status(400).json({ error: "Class required" });
    }
    if (!_Subject) {
      return res.status(400).json({ error: "Subject required" });
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
        .json({ error: "Parent or Guardian Surname Email required" });
    }
    if (!parentGuardianPhone) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Surname Phone required" });
    }
    if (!parentGuardianOccupation) {
      return res
        .status(400)
        .json({ error: "Parent or Guardian Surname Occupation required" });
    }

    console.log(req.body);
    // Query for Admission Data
    const admission = await Admission.findOne({
      admissionNumber: _AdmissionNumber,
    });
    if (!admission) {
      return res.status(400).json({ error: "Admission Number Invalid" });
    }
    // Query for Subject Data
    const subject = await Subject.findOne({
      code: subjectCode,
    });
    if (!subject) {
      return res.status(400).json({ error: "Subject Not Available" });
    }
    // Query for Academic Level Data
    const academicLevel = await AcademicLevel.findOne({
      level: _AcademicLevel,
    });
    if (!academicLevel) {
      return res.status(400).json({ error: "Class Not Available" });
    }

    //Add Address to db
    const address = await createAddress();
    if (!address) {
      return res.status(500).json({ error: "Student Creation Failed" });
    }
    //Add Student to db
    const student = await Student.create({
      ...req.body,
      admission,
      subject,
      address,
    });
    if (!student) {
      return res.status(500).json({ error: "Student Creation Failed" });
    }
    const parentGuardian = await createParentGuardian;
    if (!parentGuardian) {
      await Student.findByIdAndDelete(student._id);
      return res.status(500).json({ error: "Student Creation Failed" });
    }
    student.parentGuardian = parentGuardian._id;
    student = await student.save();
    if (!student) {
      await Student.findByIdAndDelete(student._id);
      return res.status(500).json({ error: "Student Creation Failed" });
    }
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All Student
const getAllStudents = async (req, res) => {
  try {
    const Students = await Student.find();
    res.json(Students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Student
const getSingleStudent = async (req, res) => {
  try {
    const Student = await Student.findById(req.params.id);
    if (!Student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(Student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Student
const updateStudent = async (req, res) => {
  try {
    const Student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(Student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Student
const deleteStudent = async (req, res) => {
  try {
    const Student = await Student.findByIdAndDelete(req.params.id);
    if (!Student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
