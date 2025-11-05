const express = require('express');
const router = express.Router();
const systemAdminController = require('../Controllers/SystemAdminController');

// Get current system settings
router.get('/settings', systemAdminController.getSettings);

// Update system settings (admin only)
router.put('/settings', systemAdminController.updateSettings);

module.exports = router;
