const Room = require('../models/RoomSchema');
const Booking = require('../models/BookingSchema');
const MaintenanceRequest = require('../models/CleaningRequestSchema');
const HousekeepingTaskModel = require('../models/HouseKeepingSchema');

// ------------------- ADD ROOM -------------------
exports.addRoom = async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).json({ message: 'Room added successfully', room });
    } catch (error) {
        res.status(500).json({ message: 'Error adding room', error: error.message });
    }
};

// ------------------- GET ALL ROOMS -------------------
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rooms', error: error.message });
    }
};

// ------------------- GET ROOM BY ID -------------------
exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching room', error: error.message });
    }
};

// ------------------- UPDATE ROOM STATUS -------------------
exports.updateRoomStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const room = await Room.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.status(200).json({ message: 'Room status updated', room });
    } catch (error) {
        res.status(500).json({ message: 'Error updating room', error: error.message });
    }
};

// ------------------- CHECK AVAILABILITY -------------------
exports.checkAvailability = async (req, res) => {
    try {
        const { checkInDate, checkOutDate } = req.body;

        // Find all rooms not in use for the given date range
        const availableRooms = await Room.aggregate([
            {
                $lookup: {
                    from: 'bookings',
                    localField: '_id',
                    foreignField: 'roomId',
                    as: 'bookings'
                }
            },
            {
                $match: {
                    $or: [
                        { bookings: { $size: 0 } },
                        {
                            bookings: {
                                $not: {
                                    $elemMatch: {
                                        $or: [
                                            { checkInDate: { $lt: new Date(checkOutDate), $gte: new Date(checkInDate) } },
                                            { checkOutDate: { $gt: new Date(checkInDate), $lte: new Date(checkOutDate) } }
                                        ],
                                        status: { $in: ['reserved', 'checked-in'] }
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        ]);

        res.status(200).json(availableRooms);
    } catch (error) {
        res.status(500).json({ message: 'Error checking availability', error: error.message });
    }
};

// ------------------- UPDATE ROOM STATUS BASED ON TASKS -------------------
exports.syncRoomStatus = async (roomId) => {
    try {
        const room = await Room.findById(roomId);
        if (!room) return;

        // Check for active housekeeping tasks
        const housekeeping = await HousekeepingTaskModel.findOne({
            roomId,
            status: { $in: ['pending', 'in-progress'] }
        });

        // Check for active maintenance requests
        const maintenance = await MaintenanceRequest.findOne({
            roomId,
            status: { $in: ['open', 'in-progress'] }
        });

        if (maintenance) room.status = 'maintenance';
        else if (housekeeping) room.status = 'cleaning';
        else if (room.status === 'occupied') room.status = 'occupied';
        else room.status = 'available';

        await room.save();
    } catch (error) {
        console.error('Error syncing room status:', error.message);
    }
};
