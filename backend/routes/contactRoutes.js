const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  replyToContact
} = require('../controllers/contactController');
const auth = require('../middleware/auth');

router.post('/', submitContact);
router.get('/', auth, getAllContacts);
router.post('/reply', auth, replyToContact);

module.exports = router;
