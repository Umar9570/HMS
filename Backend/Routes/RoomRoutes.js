const express = require('express');
const router = express.Router();
const RoomController = require('../Controllers/RoomController');

router.post('/', RoomController.addRoom);
router.get('/', RoomController.getAllRooms);
router.get('/:id', RoomController.getRoomById);
router.put('/:id/status', RoomController.updateRoomStatus);
router.post('/availability', RoomController.checkAvailability);

module.exports = router;
