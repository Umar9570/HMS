const express = require('express');
const router = express.Router();
const MaintenanceController = require('../Controllers/MaintenanceController');

router.post('/', MaintenanceController.reportIssue);
router.get('/', MaintenanceController.getAllRequests);
router.put('/:id/status', MaintenanceController.updateRequestStatus);

module.exports = router;
