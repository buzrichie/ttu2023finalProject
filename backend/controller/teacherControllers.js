const Teacher = require("../models/teacherModel");
const Subject = require("../models/subjectModel");
const Address = require("../models/addressModel");
const School = require("../models/schoolModel");
const Application = require("../models/applicationModel");
const AcademicLevel = require("../models/academicLevelModel");
const generateRandomPassword = require("../utils/passwordGenerator");
const generateNumericalString = require("../utils/numericalStringGenerator");
const bcrypt = require("bcrypt");
const generateJWT = require("../utils/jwtGenerator");

// Create or add Teacher
const createTeacher = async (req, res) => {
  try {
    const {
      _Subject,
      gender,
      street,
      wpsAddress,
      state,
      city,
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
    if (!street) {
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
    const address = await Address.create({ street, wpsAddress, state, city });
    if (!address) {
      return res.status(500).json({ error: "Teacher Creation Failed" });
    }

    // Generate numerical string and password
    const teacherID = await generateNumericalString();
    const password = await generateRandomPassword(10);
    console.log(password);
    // Add Teacher to db
    const teacher = await Teacher.create({
      teacherID,
      password,
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
    // Update Models fields after Creating Teacher
    // Query for School Data
    const school = await School.findById(teacher.school);
    if (!school) {
      await Teacher.findByIdAndDelete(teacher._id);
      return res.status(400).json({ error: "School Not Found" });
    }
    school.teachers.push(teacher);
    await school.save();

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

    // Send the Teacher object without including the Hashed Password
    const teacherWithoutPassword = { ...teacher._doc };
    delete teacherWithoutPassword.password;
    return res.status(201).json({ teacher: teacherWithoutPassword, password });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Login
const login = async (req, res) => {
  try {
    const { teacherID, password } = req.body;
    if (!teacherID) {
      return res.status(400).json({ error: "Teacher ID Number Required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password Required" });
    }
    const teacher = await Teacher.findOne({ teacherID });
    if (!teacher) {
      return res.status(201).json({ error: "Invalid Teacher ID number" });
    }
    //Authenticate the Password
    const match = await bcrypt.compare(password, teacher.password);
    if (!match) {
      return res.status(201).json({ error: "Not a valid Password" });
    }
    //Genete a Jwt Token
    const payload = { id: teacher._id, application: teacher.application };
    const token = generateJWT(payload, process.env.SECRET);
    // Send the teacher object without including the password
    const teacherWithoutPassword = { ...teacher._doc };
    delete teacherWithoutPassword.password;
    return res.status(201).json({ teacher: teacherWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get All Teacher
const getAllTeacher = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    console.log({ Teachers: teachers });
    res.json(teachers);
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
  login,
  getAllTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
};
