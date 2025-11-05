const { Schema, default: mongoose } = require('mongoose');

const serviceRequestSchema = new Schema({
  guestId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
  serviceType: {
    type: String,
    enum: ['room_service', 'wake_up', 'transport', 'laundry', 'other'],
    required: true
  },
  details: String,
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  requestedAt: { type: Date, default: Date.now },
  completedAt: Date
}, { timestamps: true });

const ServiceRequestModel = mongoose.model('ServiceRequest', serviceRequestSchema);
module.exports = ServiceRequestModel;
