const Subject = require("../models/subjectModel");
const AcademicLevel = require("../models/academicLevelModel");
const School = require("../models/schoolModel");

// Create or add Subject
const createSubject = async (req, res) => {
  try {
    const { name, code, _School, _AcademicLevel } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name required" });
    }
    if (!code) {
      return res.status(400).json({ error: "Code required" });
    }

    // Query for School Data only if provided in request body

    const school = _School
      ? await School.findOne({
          _id: _School._id,
        })
      : null;

    // Create Subject depending on Data found
    const subject = await Subject.create({ school, ...req.body });

    if (!subject) {
      return res.status(400).json({ error: "Subject Not Created" });
    }

    if (school) {
      school.subjects.push(subject);
      await school.save();
      subject.schools.push(subject);
      await subject.save();
    }

    // Update fields that relate to AcademicLevel - Subject
    if (_AcademicLevel) {
      const academicLevels = await AcademicLevel.find({
        level: _AcademicLevel,
      });

      if (academicLevels) {
        academicLevels.map(async (academicLevel) => {
          subject.academicLevels.push(academicLevel);
          await subject.save();

          // Update academicLevel.subjects field
          academicLevel.subjects.push(subject);
          await academicLevel.save();
        });
      }
    }

    //Submit Subject
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//Get All Subject
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    res.status(201).json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Subject
const getSingleSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Subject
const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Subject
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};
