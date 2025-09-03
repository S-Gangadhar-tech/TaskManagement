const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  updatePassword
} = require('../Controllers/authController');
const { protect } = require('../Middlewares/auth');
const {
  registerValidation,
  loginValidation,
  updatePasswordValidation
} = require('../Middlewares/validation');

const router = express.Router();

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', logout);

// Protected routes
router.use(protect); // All routes after this middleware are protected

router.get('/me', getMe);
router.patch('/update-password', updatePasswordValidation, updatePassword);

module.exports = router;