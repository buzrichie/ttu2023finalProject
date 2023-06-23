const Student = require("../models/studentModel");
const Subject = require("../models/subjectModel");
const Admission = require("../models/admissionModel");
const Address = require("../models/addressModel");
const ParentGuardian = require("../models/parentGuardianModel");
const AcademicLevel = require("../models/academicLevelModel");

// Create or add Student
const createStudent = async (req, res) => {
  const {
    applicantAdmissionNumber,
    subjectCode,
    applicantAcademicLevel,
    p_gFullName,
    p_gEmail,
    p_gPhone,
    p_gOccupation,
  } = req.body;

  console.log(req.body);
  // Query for Admission Data
  const admission = await Admission.findOne({
    admissionNumber: applicantAdmissionNumber,
  });
  console.log("admission Passed");
  // Query for Subject Data
  const subject = await Subject.findOne({
    code: subjectCode,
  });
  console.log("subject Passed");
  // Query for Academic Level Data
  const academicLevel = await AcademicLevel.findOne({
    name: applicantAcademicLevel,
  });
  console.log(academicLevel);
  // console.log(subject);
  if (admission && subject && academicLevel) {
    try {
      //Add Address to db
      const address = await Address.create({
        ...req.body,
      });
      //Add Student to db
      const student = await Student.create({
        ...req.body,
        admission,
        subject,
        address,
      });
      const parentGuardian = await ParentGuardian.create({
        fullName: p_gFullName,
        email: p_gEmail,
        phone: p_gPhone,
        occupation: p_gOccupation,
        address,
        student,
      });

      student.parentGuardian = parentGuardian._id;
      await student.save();

      console.log(student);
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json(error);
      console.log(error);
    }
  } else {
    res.status(301).json("Admission Number not found");
  }
};

//Get All Student
const getAllStudent = async (req, res) => {
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
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
