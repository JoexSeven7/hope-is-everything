const express = require('express');
const router = express.Router();
const donationsController = require('../controllers/donationsController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/', donationsController.createDonation);
router.get('/', donationsController.getDonations);
router.get('/stats', donationsController.getDonationStats);
router.get('/:id', donationsController.getDonationById);

// Protected routes (admin only)
router.put('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), donationsController.updateDonationStatus);

module.exports = router;
