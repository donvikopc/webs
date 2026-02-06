const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts
} = require('../controllers/contactController');
const auth = require('../middleware/auth');

router.post('/', submitContact);
router.get('/', auth, getAllContacts);

module.exports = router;
