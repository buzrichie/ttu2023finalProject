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

/**
 * Create a new teacher.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const createTeacher = async (req, res) => {
  let address;
  let teacher;
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

    // Request body field checks
    if (!firstName) {
      return res.status(400).json({ error: "Firstname is required." });
    }
    if (!surName) {
      return res.status(400).json({ error: "Surname is required." });
    }
    if (!dateOfBirth) {
      return res.status(400).json({ error: "Date of Birth is required." });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }
    if (!phone) {
      return res.status(400).json({ error: "Phone Number is required." });
    }
    if (!qualification) {
      return res.status(400).json({ error: "Qualification is required." });
    }
    if (!teachingExperience) {
      return res
        .status(400)
        .json({ error: "Teaching Experience is required." });
    }
    if (!gender) {
      return res.status(400).json({ error: "Gender is required." });
    }
    // if (!street) {
    //   return res.status(400).json({ error: "Street is required." });
    // }
    // if (!state) {
    //   return res.status(400).json({ error: "State is required." });
    // }
    // if (!city) {
    //   return res.status(400).json({ error: "City is required." });
    // }
    // if (!wpsAddress) {
    //   return res.status(400).json({ error: "WPS Address is required." });
    // }
    // if (!_School) {
    //   return res.status(400).json({ error: "School is required." });
    // }
    if (!_Subject) {
      return res.status(400).json({ error: "Subject is required." });
    }

    // Query for Application Data
    const application = await Application.findOne({ applicationNumber });
    if (!application) {
      return res.status(400).json({ error: "Invalid Application Number." });
    }

    // Add Address to database
    // address = await Address.create({ street, wpsAddress, state, city });
    // if (!address) {
    //   return res.status(500).json({ error: "Failed To Create Teacher." });
    // }

    // Generate numerical string and password
    const id = await generateNumericalString("TE");
    const password = await generateRandomPassword(10);

    // Add Teacher to database
    teacher = await Teacher.create({
      id,
      password,
      application,

      role: "TEACHER",
      school: application.school._id,
      academicLevel: application.academicLevel
        ? application.academicLevel._id
        : null,
      ...req.body,
    });
    if (!teacher) {
      await Address.findByIdAndDelete(address._id);
      return res.status(500).json({ error: "Failed To Create Teacher." });
    }

    // Update Models fields after Creating Teacher
    // Query for School Data
    const school = await School.findById(teacher.school);
    if (!school) {
      await Teacher.findByIdAndDelete(teacher._id);
      await Address.findByIdAndDelete(address._id);
      return res.status(400).json({ error: "School Not Found." });
    }
    school.teachers.push(teacher);
    await school.save();

    if (teacher.academicLevel) {
      // Query for Academic Level Data
      const academicLevel = await AcademicLevel.findById(teacher.academicLevel);

      if (!academicLevel) {
        await Teacher.findByIdAndDelete(teacher._id);
        await Address.findByIdAndDelete(address._id);
        return res.status(400).json({ error: "Class Not Found." });
      }
      academicLevel.teachers.push(teacher);
      await academicLevel.save();
    }

    // Send the Teacher object without including the hashed password
    const teacherWithoutPassword = { ...teacher._doc };
    delete teacherWithoutPassword.password;
    console.log({ teacher: teacherWithoutPassword, password });
    return res.status(201).json({ teacher: teacherWithoutPassword, password });
  } catch (error) {
    if (address) {
      // Delete the Address record from the database
      await Address.findByIdAndDelete(address._id);
    }
    if (teacher) {
      // Delete the Teacher record from the database
      await Teacher.findByIdAndDelete(teacher._id);
    }
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error occurred while creating the teacher." });
  }
};

//Login
const login = async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Teacher ID Number Required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password Required" });
    }
    const teacher = await Teacher.findOne({ id });
    if (!teacher) {
      return res.status(201).json({ error: "Invalid Teacher ID number" });
    }
    //Authenticate the Password
    const match = await bcrypt.compare(password, teacher.password);
    if (!match) {
      return res.status(201).json({ error: "Not a valid Password" });
    }
    //Genete a Jwt Token
    const payload = { id: teacher._id, role: teacher.role };
    const token = generateJWT(payload, process.env.SECRET);

    // Send the teacher object without including the password
    const teacherWithoutPassword = { ...teacher._doc };
    delete teacherWithoutPassword.password;
    console.log({ teacher: teacherWithoutPassword, token });
    return res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get All Teacher
const getAllTeacher = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate("subjects address academicLevel school")
      .sort({ createdAt: -1 });
    res.status(201).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Teacher
const getSingleTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate(
      "subjects address academicLevel school"
    );

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    const teacherWithoutPassword = { ...teacher._doc };
    delete teacherWithoutPassword.password;
    res.status(201).json({ teacher: teacherWithoutPassword });
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
