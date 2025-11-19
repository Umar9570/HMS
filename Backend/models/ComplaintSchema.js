const { Schema, default: mongoose } = require("mongoose");

const complaintSchema = new Schema(
  {
    // Reference to the user (guest or staff)
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    // Complaint type/category
    complaintType: { type: String, required: true },

    // Status of the complaint
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },

    // Complaint message/details
    message: { type: String, required: true },

    // Optional: link to a related booking
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking" },
  },
  { timestamps: true }
);

const ComplaintModel = mongoose.model("Complaint", complaintSchema);

module.exports = ComplaintModel;
