const express = require('express');
const router = express.Router();
const HousekeepingController = require('../Controllers/HouseKeepingController');

router.post('/', HousekeepingController.createTask);
router.get('/', HousekeepingController.getAllTasks);
router.put('/:id/status', HousekeepingController.updateTaskStatus);

module.exports = router;
