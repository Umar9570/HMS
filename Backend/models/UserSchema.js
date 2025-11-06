const { Schema, default: mongoose } = require('mongoose');

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: {
    type: String,
    enum: ['admin', 'manager', 'receptionist', 'housekeeping', 'guest'],
    default: 'guest'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  preferences: {
    roomType: String,
    specialRequests: String
  }
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
