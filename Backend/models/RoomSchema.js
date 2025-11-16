const { Schema, default: mongoose } = require('mongoose');

const roomSchema = new Schema({
  roomNumber: { type: String, required: true, unique: true },
  roomType: {
    type: String,
    enum: ['single', 'double', 'suite', 'deluxe'],
    required: true
  },
  pricePerNight: { type: Number, required: true },
  status: {
    type: String,
    enum: ['available', 'occupied', 'cleaning', 'maintenance'],
    default: 'available'
  },
  amenities: [String],
  description: String
}, { timestamps: true });

const RoomModel = mongoose.model('Room', roomSchema);
module.exports = RoomModel;
