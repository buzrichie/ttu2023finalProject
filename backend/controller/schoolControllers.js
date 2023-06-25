const School = require("../models/schoolModel");
const Subject = require("../models/subjectModel");
const AcademicLevel = require("../models/academicLevelModel");
const Student = require("../models/studentModel");
const Teacher = require("../models/teacherModel");

// Create or add School
const createSchool = async (req, res) => {
  try {
    const { _AcademicLevel, _Student, _Teacher, _Subject } = req.body;

    // Query for Academic Level Data only if provided in request body
    const academicLevel = _AcademicLevel
      ? await AcademicLevel.findOne({
          level: _AcademicLevel,
        })
      : null;

    console.log(academicLevel);
    // Query for Subject Data only if provided in request body
    const subject = _Subject
      ? await Subject.findOne({
          name: _Subject,
        })
      : null;

    // Query for Student Data only if it provided in request body
    const student = _Student
      ? await Student.findOne({
          fullName: _Student,
        })
      : null;
    console.log(student);

    // Query for Teacher Data only if it provided in request body
    const teacher = _Teacher
      ? await Teacher.findOne({
          fullName: _Teacher,
        })
      : null;
    console.log(teacher);

    // Create School depending on Data found
    const school = await School.create({
      academicLevel,
      student,
      teacher,
      subject,
      ...req.body,
    });
    res.status(201).json(school);
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
    res.json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update School
const updateSchool = async (req, res) => {
  try {
    const School = await School.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!School) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json(School);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete School
const deleteSchool = async (req, res) => {
  try {
    const School = await School.findByIdAndDelete(req.params.id);
    if (!School) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json({ message: "School deleted successfully" });
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
