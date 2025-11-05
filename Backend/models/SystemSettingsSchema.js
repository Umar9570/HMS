const { Schema, default: mongoose } = require('mongoose');

const systemSettingsSchema = new Schema({
  defaultCurrency: { type: String, default: 'USD' },
  checkInTime: { type: String, default: '14:00' },   // in HH:mm format
  checkOutTime: { type: String, default: '12:00' },
  taxes: [{
    name: String,
    percentage: Number
  }],
  cancellationPolicy: { type: String, default: 'Free cancellation up to 24 hours before check-in' },
  maxGuestsPerRoom: { 
    single: { type: Number, default: 1 },
    double: { type: Number, default: 2 },
    suite: { type: Number, default: 4 },
    deluxe: { type: Number, default: 3 }
  }
}, { timestamps: true });

const SystemSettingsModel = mongoose.model('SystemSettings', systemSettingsSchema);
module.exports = SystemSettingsModel;
