const AcademicLevel = require("../models/academicLevelModel");
// const Student = require("../models/studentModel");
const Subject = require("../models/subjectModel");
const School = require("../models/schoolModel");

// Create or add AcademicLevel
const createAcademicLevel = async (req, res) => {
  try {
    const { _Subject, level, _School } = req.body;

    if (!level) {
      return res.status(400).json({ error: "Class required" });
    }
    // Query for Subject Data only if provided in request body
    const school = _School
      ? await School.findOne({
          schoolName: _School,
        })
      : null;

    // Query for Subject Data only if provided in request body
    const subject = _Subject
      ? await Subject.findOne({
          code: _Subject,
        })
      : null;

    // Create AcademicLevel depending on Data found
    const academicLevel = await AcademicLevel.create({
      school,
      ...req.body,
    });

    if (!academicLevel) {
      return res.status(400).json({ error: "Class Not Created" });
    }

    //Update fields that relate to Class - Academic Level
    if (school) {
      school.academicLevels.push(academicLevel);
      await school.save();
    }

    // Update fields that relate to Class - Academic Level
    if (_Subject) {
      const subjects = await Subject.find({
        code: _Subject,
      });

      if (subjects) {
        subjects.map(async (subject) => {
          academicLevel.subjects.push(subject);
          await academicLevel.save();

          // Update subject.academicLevels field
          subject.academicLevels.push(academicLevel);
          await subject.save();
        });
      }
    }
    //Submit Academic Level
    res.status(201).json(academicLevel);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All AcademicLevel
const getAllAcademicLevel = async (req, res) => {
  try {
    const academicLevels = await AcademicLevel.find();
    res.status(201).json(academicLevels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single AcademicLevel
const getSingleAcademicLevel = async (req, res) => {
  try {
    const academicLevel = await AcademicLevel.findById(req.params.id);
    if (!academicLevel) {
      return res.status(404).json({ error: "AcademicLevel not found" });
    }
    res.json(academicLevel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update AcademicLevel
const updateAcademicLevel = async (req, res) => {
  try {
    const academicLevel = await AcademicLevel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!academicLevel) {
      return res.status(404).json({ error: "AcademicLevel not found" });
    }
    res.json(academicLevel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete AcademicLevel
const deleteAcademicLevel = async (req, res) => {
  try {
    const academicLevel = await AcademicLevel.findByIdAndDelete(req.params.id);
    if (!academicLevel) {
      return res.status(404).json({ error: "AcademicLevel not found" });
    }
    res.json({ message: "AcademicLevel deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createAcademicLevel,
  getAllAcademicLevel,
  getSingleAcademicLevel,
  updateAcademicLevel,
  deleteAcademicLevel,
};
