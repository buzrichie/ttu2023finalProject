const Teacher = require("../models/teacherModel");
const Subject = require("../models/subjectModel");
const Address = require("../models/addressModel");
const School = require("../models/schoolModel");
const Application = require("../models/applicationModel");
const AcademicLevel = require("../models/academicLevelModel");

// Create or add Teacher
const createTeacher = async (req, res) => {
  try {
    const {
      _Subject,
      gender,
      _address,
      _School,
      applicationNumber,
      email,
      phone,
      qualification,
      teachingExperience,
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
    if (!email) {
      return res.status(400).json({ error: "Email reqiured" });
    }
    if (!applicationNumber) {
      return res.status(400).json({ error: "Application Number required" });
    }
    if (!phone) {
      return res.status(400).json({ error: "Phone Number required" });
    }
    if (!qualification) {
      return res.status(400).json({ error: "Occupation required" });
    }
    if (!teachingExperience) {
      return res.status(400).json({ error: "Teaching Experience required" });
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
    if (!_Subject) {
      return res.status(400).json({ error: "Subject required" });
    }

    // Query for Application Data
    const application = await Application.findOne({ applicationNumber });
    if (!application) {
      return res.status(400).json({ error: "Invalid Application Number" });
    }

    // Add Address to db
    const address = await Address.create(_address);
    if (!address) {
      return res.status(500).json({ error: "Teacher Creation Failed" });
    }

    // Add Teacher to db
    const teacher = await Teacher.create({
      application,
      address,
      school: application.school._id,
      academicLevel: application.academicLevel
        ? application.academicLevel._id
        : null,
      ...req.body,
    });
    if (!teacher) {
      return res.status(500).json({ error: "Teacher Creation Failed" });
    }
    // Query for School Data
    const school = await School.findById(teacher.school);
    if (!school) {
      await Teacher.findByIdAndDelete(teacher._id);
      return res.status(400).json({ error: "School Not Found" });
    }
    school.teachers.push(teacher);
    await school.save();
    console.log(teacher);
    console.log(teacher.academicLevel);
    if (teacher.academicLevel) {
      // Query for Academic Level Data
      const academicLevel = await AcademicLevel.findById(teacher.academicLevel);

      if (!academicLevel) {
        await Teacher.findByIdAndDelete(teacher._id);
        await Address.findByIdAndDelete(address._id);
        return res.status(400).json({ error: "Class Not Found" });
      }
      academicLevel.teachers.push(teacher);
      await academicLevel.save();
    }
    const saveTeacher = await teacher.save();
    if (!saveTeacher) {
      await Teacher.findByIdAndDelete(saveTeacher._id);
      await Address.findByIdAndDelete(address._id);
      return res.status(500).json({ error: "Teacher Creation Failed" });
    }
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All Teacher
const getAllTeacher = async (req, res) => {
  try {
    const Teachers = await Teacher.find();
    res.json(Teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Teacher
const getSingleTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Teacher
const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createTeacher,
  getAllTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
};
