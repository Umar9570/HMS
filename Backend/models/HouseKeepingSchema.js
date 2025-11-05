const { Schema, default: mongoose } = require('mongoose');

const housekeepingTaskSchema = new Schema({
  roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  taskType: {
    type: String,
    enum: ['cleaning', 'maintenance'],
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  reportedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const HousekeepingTaskModel = mongoose.model('HousekeepingTask', housekeepingTaskSchema);
module.exports = HousekeepingTaskModel;
