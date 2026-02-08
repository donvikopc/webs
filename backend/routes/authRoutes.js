const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/profile', auth, getAdminProfile);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

module.exports = router;
