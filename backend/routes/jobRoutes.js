const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');
const auth = require('../middleware/auth');

router.route('/')
  .get(getAllJobs)
  .post(auth, createJob);

router.route('/:id')
  .get(getJobById)
  .put(auth, updateJob)
  .delete(auth, deleteJob);

module.exports = router;
