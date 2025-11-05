const { Schema, default: mongoose } = require('mongoose');

const maintenanceRequestSchema = new Schema({
  roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  issue: { type: String, required: true },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved'],
    default: 'open'
  },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const MaintenanceRequestModel = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
module.exports = MaintenanceRequestModel;
