const Booking = require('../models/BookingSchema');
const Room = require('../models/RoomSchema');
const User = require('../models/UserSchema');
const Invoice = require('../models/InvoiceSchema');

// ------------------- CREATE NEW BOOKING -------------------
exports.createBooking = async (req, res) => {
    try {
        const { guestId, roomId, checkInDate, checkOutDate, numberOfGuests } = req.body;

        // Check if room exists and is available
        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        if (room.status !== 'available')
            return res.status(400).json({ message: 'Room is not available for booking' });

        // Calculate total price (basic version)
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const totalPrice = nights * room.pricePerNight;

        // Create booking
        const booking = new Booking({
            guestId,
            roomId,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            totalPrice
        });

        await booking.save();

        // Update room status to occupied
        room.status = 'occupied';
        await room.save();

        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

// ------------------- GET ALL BOOKINGS -------------------
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('guestId', 'firstName lastName email')
            .populate('roomId', 'roomNumber roomType pricePerNight');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
};

// ------------------- GET BOOKING BY ID -------------------
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('guestId', 'firstName lastName email')
            .populate('roomId', 'roomNumber roomType pricePerNight');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking', error: error.message });
    }
};

// ------------------- CHECK-IN -------------------
exports.checkIn = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        booking.status = 'checked-in';
        await booking.save();

        const room = await Room.findById(booking.roomId);
        room.status = 'occupied';
        await room.save();

        res.status(200).json({ message: 'Guest checked in successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error during check-in', error: error.message });
    }
};

// ------------------- CHECK-OUT -------------------
exports.checkOut = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('guestId', 'firstName lastName email')
            .populate('roomId', 'roomNumber roomType pricePerNight');

        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        // Update booking details
        booking.status = 'checked-out';
        booking.paymentStatus = 'paid';
        await booking.save();

        // Update room status to cleaning
        const room = await Room.findById(booking.roomId);
        room.status = 'cleaning';
        await room.save();

        // --- Generate Invoice Automatically ---
        const roomCharge = booking.totalPrice;
        const taxRate = 0.1; // 10% tax example
        const taxes = roomCharge * taxRate;
        const totalAmount = roomCharge + taxes;

        // Create invoice items array
        const items = [
            {
                description: `Room stay (${room.roomType})`,
                amount: roomCharge,
                type: 'room'
            }
        ];

        // Create the invoice document
        const invoice = new Invoice({
            bookingId: booking._id,
            guestId: booking.guestId._id,
            items,
            subtotal: roomCharge,
            taxes,
            totalAmount,
            paymentMethod: 'card', // default for now
            issuedDate: new Date(),
            paid: true
        });

        await invoice.save();

        res.status(200).json({
            message: 'Guest checked out successfully and invoice generated',
            booking,
            invoice
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during check-out', error: error.message });
    }
};

// ------------------- CANCEL BOOKING -------------------
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        booking.status = 'cancelled';
        booking.paymentStatus = 'refunded';
        await booking.save();

        const room = await Room.findById(booking.roomId);
        room.status = 'available';
        await room.save();

        res.status(200).json({ message: 'Booking cancelled successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling booking', error: error.message });
    }
};
