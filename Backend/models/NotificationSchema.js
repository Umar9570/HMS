const { Schema, default: mongoose } = require('mongoose');

const notificationSchema = new Schema({
  recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ['booking', 'maintenance', 'system', 'payment']
  },
  read: { type: Boolean, default: false }
}, { timestamps: true });

const NotificationModel = mongoose.model('Notification', notificationSchema);
module.exports = NotificationModel;
