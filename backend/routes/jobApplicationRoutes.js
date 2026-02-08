const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getAllApplications,
  updateApplicationStatus,
  replyToApplicant
} = require('../controllers/jobApplicationController');
const auth = require('../middleware/auth');

router.post('/', submitApplication);
router.get('/', auth, getAllApplications);
router.put('/:id', auth, updateApplicationStatus);
router.post('/reply', auth, replyToApplicant);

module.exports = router;
