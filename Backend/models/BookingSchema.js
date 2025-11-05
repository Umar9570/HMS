const { Schema, default: mongoose } = require('mongoose');

const bookingSchema = new Schema({
  guestId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['reserved', 'checked-in', 'checked-out', 'cancelled'],
    default: 'reserved'
  },
  numberOfGuests: Number,
  totalPrice: Number,
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  }
}, { timestamps: true });

const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports = BookingModel;
