const express = require('express');
const router = express.Router();
const ReportsController = require('../Controllers/ReportsController');

router.get('/occupancy', ReportsController.getOccupancyRate);
router.get('/revenue', ReportsController.getRevenueReport);
router.get('/popular-rooms', ReportsController.getPopularRoomTypes);
router.get('/daily-bookings', ReportsController.getDailyBookings);

module.exports = router;
