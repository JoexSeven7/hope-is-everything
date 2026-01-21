const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/verify-email', usersController.verifyEmail);
router.post('/forgot-password', usersController.forgotPassword);
router.post('/reset-password', usersController.resetPassword);

// Protected routes
router.get('/me', authMiddleware.protect, usersController.getMe);
router.put('/profile', authMiddleware.protect, usersController.updateProfile);

module.exports = router;
