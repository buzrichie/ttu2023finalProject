const School = require("../models/schoolModel");
const Subject = require("../models/subjectModel");
const Application = require("../models/applicationModel");
const generateNumericalString = require("../utils/numericalStringGenerator");

/**
 * Create a new application.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const createApplication = async (req, res) => {
  let application;
  try {
    const { _Subject, applicationDate, _School } = req.body;

    if (!_School) {
      return res.status(400).json({ error: "School is required." });
    }
    if (!applicationDate) {
      return res.status(400).json({ error: "Application Date is required." });
    }

    const school = await School.findOne({ _id: _School });
    if (!school) {
      return res.status(400).json({ error: "Invalid School." });
    }

    const subject = _Subject ? await Subject.findOne({ _id: _Subject }) : null;

    if (_Subject && !subject) {
      return res.status(400).json({ error: "Class Not Available." });
    }

    // Generate numerical string for application number
    const applicationNumber = await generateNumericalString("AP");

    application = await Application.create({
      ...req.body,
      applicationNumber,
      school,
      subject,
    });

    if (!application) {
      return res.status(500).json({ error: "Failed to create application." });
    }

    return res.status(201).json(application);
  } catch (error) {
    if (application) {
      // Delete the application record from the database
      await Application.findByIdAndDelete(application._id);
    }
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the application." });
  }
};

//Get All Application
const getAllApplication = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    return res.status(201).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Single Application
const getSingleApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    return res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Application
const updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    return res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Application
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    return res
      .status(201)
      .json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createApplication,
  getAllApplication,
  getSingleApplication,
  updateApplication,
  deleteApplication,
};
