const express = require('express');
const router = express.Router();
const CleaningController = require('../Controllers/CleaningController');

router.post('/', CleaningController.createRequest);
router.get('/', CleaningController.getAllRequests);
router.put('/:id/status', CleaningController.updateStatus);

module.exports = router;
