const School = require("../models/schoolModel");
const Subject = require("../models/subjectModel");
const Application = require("../models/applicationModel");
const generateNumericalString = require("../utils/numericalStringGenerator");

// Create or add application
const createApplication = async (req, res) => {
  try {
    const { _Subject, applicationDate, _School } = req.body;

    if (!_School) {
      return res.status(400).json({ error: "School Required" });
    }
    if (!applicationDate) {
      return res.status(400).json({ error: "Application Date Required" });
    }

    const school = await School.findOne({
      _id: _School,
    });
    if (!school) {
      return res.status(400).json({ error: "Invalid School" });
    }

    const subject = _Subject
      ? await Subject.findOne({
          _id: _Subject,
        })
      : null;

    if (_Subject && !subject) {
      return res.status(400).json({ error: "Class Not Available" });
    }

    // Generate numerical string and password
    const applicationNumber = await generateNumericalString();

    const application = await Application.create({
      applicationNumber,
      school,
      subject,
      ...req.body,
    });

    if (!application) {
      return res.status(400).json({ error: "Application Not Created" });
    }

    // Submit Application
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//Get All Application
const getAllApplication = async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
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
    res.json(application);
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
    res.json(application);
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
    res.json({ message: "Application deleted successfully" });
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
