const Student = require("../models/studentModel");
const Subject = require("../models/subjectModel");
const Admission = require("../models/admissionModel");
const AcademicLevel = require("../models/academicLevelModel");
const Address = require("../models/addressModel");
const School = require("../models/schoolModel");
const ParentGuardian = require("../models/parentGuardianModel");

// Create or add Student
const createStudent = async (req, res) => {
  try {
    const {
      admissionNumber,
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
    const { street, wpsAddress, country, state, city } = _address;
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
    if (!admissionNumber) {
      return res.status(400).json({ error: "Admission Number required" });
    }
    if (!gender) {
      return res.status(400).json({ error: "Gender required" });
    }
    if (!street) {
      return res.status(400).json({ error: "Street required" });
    }
    if (!country) {
      return res.status(400).json({ error: "Street required" });
    }
    if (!state) {
      return res.status(400).json({ error: "Street required" });
    }
    if (!city) {
      return res.status(400).json({ error: "Street required" });
    }
    if (!wpsAddress) {
      return res.status(400).json({ error: "Street required" });
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

    // Query for School Data
    const school = await School.findOne({
      schoolName: _School,
    });
    if (!school) {
      return res.status(400).json({ error: "School Invalid" });
    }
    // Query for Admission Data
    const admission = await Admission.findOne({
      admissionNumber: admissionNumber,
    });
    if (!admission) {
      return res.status(400).json({ error: "Admission Number Invalid" });
    }

    // Query for Subject Data
    const subject = await Subject.findOne({
      code: _Subject,
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

    const address = await Address.create(_address);
    if (!address) {
      return res.status(500).json({ error: "Student Creation Failed" });
    }

    //Add Student to db
    const student = await Student.create({
      admission,
      subjects: subject,
      address,
      school,
      academicLevel,
      ...req.body,
    });
    if (!student) {
      return res.status(500).json({ error: "Student Creation Failed" });
    }
    const parentGuardian = await ParentGuardian.create({
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

    //Update Models fields after Student Created
    student.parentGuardian = parentGuardian._id;
    const saveStudent = await student.save();

    school.students = student._id;
    subject.students = student._id;
    address.student = student._id;
    address.parentGuardian = parentGuardian._id;
    await school.save();
    await subject.save();

    const savedAddress = await address.save();

    if (!(saveStudent && savedAddress)) {
      await Student.findByIdAndDelete(saveStudent._id);
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
