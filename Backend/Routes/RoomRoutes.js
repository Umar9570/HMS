const express = require('express');
const router = express.Router();
const RoomController = require('../Controllers/RoomController');

// Add room
router.post('/', RoomController.addRoom);

// Get all rooms
router.get('/', RoomController.getAllRooms);

// Check room availability
router.post('/availability', RoomController.checkAvailability);

// Update room status
router.put('/:id/status', RoomController.updateRoomStatus);

// Get single room
router.get('/:id', RoomController.getRoomById);

// Update room
router.put('/:id', RoomController.updateRoom);

// Delete room
router.delete('/:id', RoomController.deleteRoom);

module.exports = router;
