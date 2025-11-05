const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');

// Guest self-registration
router.post('/register', authController.registerGuest);

// Staff creation by admin/manager
router.post('/create-staff', authController.createStaff);

// Login for all roles
router.post('/login', authController.login);

module.exports = router;
