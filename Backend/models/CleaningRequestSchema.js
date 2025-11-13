const { Schema, default: mongoose } = require('mongoose');

const cleaningRequestSchema = new Schema({
  roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  issue: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'cleaned'],
    default: 'pending'
  }
}, { timestamps: true });

const CleaningRequestModel = mongoose.model('CleaningRequest', cleaningRequestSchema);
module.exports = CleaningRequestModel;
