const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');

// Guest self-registration
router.post('/register', authController.registerGuest);

// Staff creation by admin/manager
router.post('/create-staff', authController.createStaff);

// Login for all roles
router.post('/login', authController.login);

// Get all guests
router.get('/users', authController.getAllGuests);

// Get all staff
router.get('/staff', authController.getAllStaff);

// Update Guest
router.put('/users/:id', authController.updateGuest);

// Update staff
router.put('/staff/:id', authController.updateStaff);

// Delete Guest
router.delete('/users/:id', authController.deleteGuest);

module.exports = router;
