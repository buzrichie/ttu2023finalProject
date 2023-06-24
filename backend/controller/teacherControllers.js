const Teacher = require("../models/teacherModel");
const Subject = require("../models/subjectModel");
const { createAddress } = require("../controller/addressControllers");

// Create or add Teacher
const createTeacher = async (req, res) => {
  try {
    const {
      _Subject,
      gender,
      _address,
      _School,
      email,
      phone,
      qualification,
      teachingExperience,
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
    if (!email) {
      return res.status(400).json({ error: "Email reqiured" });
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

    console.log(req.body);
    // Query for Admission Data
    // const admission = await Admission.findOne({
    //   admissionNumber: _AdmissionNumber,
    // });
    // if (!admission) {
    //   return res.status(400).json({ error: "Admission Number Invalid" });
    // }

    // Query for Subject Data
    const subjects = await Subject.find({
      code: subjectCode,
    });
    if (subjects.length > 0) {
      return res
        .status(400)
        .json({ error: "Subject or Subjects Not Available" });
    }

    //Add Address to db
    const address = await createAddress;
    if (!address) {
      return res.status(500).json({ error: "Student Creation Failed" });
    }

    const teacher = await Teacher.create(req.body);

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
    const Teacher = await Teacher.findById(req.params.id);
    if (!Teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json(Teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Teacher
const updateTeacher = async (req, res) => {
  try {
    const Teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json(Teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Teacher
const deleteTeacher = async (req, res) => {
  try {
    const Teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!Teacher) {
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
