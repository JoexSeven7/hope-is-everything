const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const authMiddleware = require('../middleware/auth');

// Public routes (for frontend display)
router.get('/impact', statsController.getImpactMetrics);

// Protected routes (admin only)
router.get('/overall', authMiddleware.protect, authMiddleware.restrictTo('admin'), statsController.getOverallStats);
router.get('/dashboard', authMiddleware.protect, authMiddleware.restrictTo('admin'), statsController.getDashboardData);

module.exports = router;
