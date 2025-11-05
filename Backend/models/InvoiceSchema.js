const { Schema, default: mongoose } = require('mongoose');

const invoiceSchema = new Schema({
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
  guestId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    description: String,
    amount: Number,
    type: {
      type: String,
      enum: ['room', 'food', 'laundry', 'transport', 'other']
    }
  }],
  subtotal: Number,
  taxes: Number,
  totalAmount: Number,
  paymentMethod: {
    type: String,
    enum: ['card', 'cash', 'online']
  },
  issuedDate: Date,
  paid: { type: Boolean, default: false }
}, { timestamps: true });

const InvoiceModel = mongoose.model('Invoice', invoiceSchema);
module.exports = InvoiceModel;
