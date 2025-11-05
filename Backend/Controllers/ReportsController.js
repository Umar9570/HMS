const Booking = require('../models/BookingSchema');
const Room = require('../models/RoomSchema');
const Invoice = require('../models/InvoiceSchema');

// ------------------- OCCUPANCY RATE -------------------
exports.getOccupancyRate = async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const occupiedRooms = await Room.countDocuments({ status: 'occupied' });
    const occupancyRate = totalRooms === 0 ? 0 : (occupiedRooms / totalRooms) * 100;

    res.status(200).json({
      totalRooms,
      occupiedRooms,
      occupancyRate: occupancyRate.toFixed(2) + '%'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating occupancy rate', error: error.message });
  }
};

// ------------------- REVENUE REPORT -------------------
exports.getRevenueReport = async (req, res) => {
  try {
    const invoices = await Invoice.find();

    const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
    const paidInvoices = invoices.filter(inv => inv.paid === true).length;
    const unpaidInvoices = invoices.filter(inv => inv.paid === false).length;

    res.status(200).json({
      totalInvoices: invoices.length,
      totalRevenue,
      paidInvoices,
      unpaidInvoices
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating revenue report', error: error.message });
  }
};

// ------------------- MOST POPULAR ROOM TYPES -------------------
exports.getPopularRoomTypes = async (req, res) => {
  try {
    const data = await Booking.aggregate([
      {
        $lookup: {
          from: 'rooms',
          localField: 'roomId',
          foreignField: '_id',
          as: 'room'
        }
      },
      { $unwind: '$room' },
      {
        $group: {
          _id: '$room.roomType',
          totalBookings: { $sum: 1 }
        }
      },
      { $sort: { totalBookings: -1 } }
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching room popularity', error: error.message });
  }
};

// ------------------- DAILY BOOKINGS SUMMARY -------------------
exports.getDailyBookings = async (req, res) => {
  try {
    const data = await Booking.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          bookings: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error generating daily booking report', error: error.message });
  }
};
