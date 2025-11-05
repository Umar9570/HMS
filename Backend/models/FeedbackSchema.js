const { Schema, default: mongoose } = require('mongoose');

const feedbackSchema = new Schema({
  guestId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String
}, { timestamps: true });

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);
module.exports = FeedbackModel;
