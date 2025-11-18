const { Schema, default: mongoose } = require("mongoose");

const complaintSchema = new Schema(
  {
    // Reference to the user (could be guest or staff)
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    // The name and role of the complainant (for quick access/display)
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["guest", "staff"],
      required: true,
    },

    // Contact info
    phone: { type: String, required: true },

    // Complaint type/category (e.g., Room Service, Equipment, Cleanliness)
    complaintType: { type: String, required: true },
    
    // Status of the complaint
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },

    // Complaint message/details
    message: { type: String, required: true },

    // Optional field: link to a related booking if applicable
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking" },
  },
  { timestamps: true }
);

// Model creation
const ComplaintModel = mongoose.model("Complaint", complaintSchema);

module.exports = ComplaintModel;
