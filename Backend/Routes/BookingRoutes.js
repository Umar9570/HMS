const express = require('express');
const router = express.Router();
const BookingController = require('../Controllers/BookingController');

// Create new booking
router.post('/', BookingController.createBooking);

// Get all bookings
router.get('/', BookingController.getAllBookings);

// Get booking by ID
router.get('/:id', BookingController.getBookingById);

// Check-in
router.put('/checkin/:id', BookingController.checkIn);

// Check-out
router.put('/checkout/:id', BookingController.checkOut);

// Cancel booking
router.put('/cancel/:id', BookingController.cancelBooking);

module.exports = router;
