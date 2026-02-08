const JobApplication = require('../models/JobApplication');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit a job application
// @route   POST /api/careers
// @access  Public
const submitApplication = async (req, res) => {
  try {
    const application = new JobApplication(req.body);
    const savedApplication = await application.save();
    res.status(201).json({ message: 'Application submitted successfully', application: savedApplication });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all job applications
// @route   GET /api/careers
// @access  Private/Admin
const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status
// @route   PUT /api/careers/:id
// @access  Private/Admin
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Reply to applicant
// @route   POST /api/careers/reply
// @access  Private/Admin
const replyToApplicant = async (req, res) => {
  try {
    const { email, subject, message, id } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({ message: 'Please provide email, subject and message' });
    }

    await sendEmail({
      email,
      subject,
      message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email: ' + error.message });
  }
};

module.exports = {
  submitApplication,
  getAllApplications,
  updateApplicationStatus,
  replyToApplicant
};
