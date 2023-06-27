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
      parentGuardianFirstName,
      parentGuardianSurName,
      parentGuardianEmail,
      parentGuardianPhone,
      parentGuardianOccupation,
      gender,
      _address,
      firstName,
      surName,
      dateOfBirth,
    } = req.body;
    const { street, wpsAddress, country, state, city } = _address;
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

    // Query for Admission Data
    const admission = await Admission.findOne({ admissionNumber });
    if (!admission) {
      return res.status(400).json({ error: "Invalid Admission Number" });
    }

    // Add Address to db
    const address = await Address.create(_address);
    if (!address) {
      return res.status(500).json({ error: "Student Creation Failed" });
    }

    // Add Student to db
    const student = await Student.create({
      admission,
      address,
      school: admission.school._id,
      academicLevel: admission.academicLevel._id,
      ...req.body,
    });
    if (!student) {
      return res.status(500).json({ error: "Student Creation Failed" });
    }

    // Add Parent/Guardian to db
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

    // Update Models fields after Student Created
    student.parentGuardian = parentGuardian._id;
    address.student = student._id;
    address.parentGuardian = parentGuardian._id;
    await address.save();

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

    const saveStudent = await student.save();
    if (!saveStudent) {
      await Student.findByIdAndDelete(saveStudent._id);
      await Address.findByIdAndDelete(address._id);
      await ParentGuardian.findByIdAndDelete(parentGuardian._id);
      return res.status(500).json({ error: "Student Creation Failed" });
    }

    console.log(saveStudent);
    res.status(201).json(saveStudent);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All Students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
    console.log({ students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Student
const getSingleStudent = async (req, res) => {
  try {
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
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
