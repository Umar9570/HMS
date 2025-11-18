const ComplaintModel = require("../models/ComplaintSchema");
const UserModel = require("../models/UserSchema");
const BookingModel = require("../models/BookingSchema");

const ComplaintController = {

    // GET ALL COMPLAINTS
    getAllComplaints: async (req, res) => {
        try {
            const complaints = await ComplaintModel.find()
                .populate("userId", "firstName lastName role phone")
                .populate("bookingId", "roomNumber roomType checkInDate");

            const formatted = complaints.map(c => ({
                _id: c._id,
                name: c.name || (c.userId ? `${c.userId.firstName} ${c.userId.lastName}` : "Unknown"),
                role: c.role || c.userId?.role || "guest",
                phone: c.phone || c.userId?.phone || "",
                complaintType: c.complaintType,
                status: c.status,
                message: c.message,
                bookingId: c.bookingId?._id || null,
                roomNumber: c.bookingId?.roomNumber || "N/A",
                roomType: c.bookingId?.roomType || "N/A",
                date: c.createdAt,
            }));

            res.json({ status: true, complaints: formatted });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: error.message });
        }
    },

    // UPDATE COMPLAINT STATUS
    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!["pending", "in-progress", "resolved"].includes(status)) {
                return res.status(400).json({ status: false, message: "Invalid status value." });
            }

            const updated = await ComplaintModel.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );

            if (!updated) {
                return res.status(404).json({ status: false, message: "Complaint not found." });
            }

            res.json({ status: true, complaint: updated });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: error.message });
        }
    },

    // OPTIONAL: CREATE NEW COMPLAINT
    createComplaint: async (req, res) => {
        try {
            const { userId, name, role, phone, complaintType, message, bookingId } = req.body;

            if (!userId || !name || !role || !phone || !complaintType || !message) {
                return res.status(400).json({ status: false, message: "All required fields must be provided." });
            }

            const newComplaint = new ComplaintModel({
                userId, name, role, phone, complaintType, message, bookingId
            });

            await newComplaint.save();
            res.json({ status: true, complaint: newComplaint });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: error.message });
        }
    }
};

module.exports = ComplaintController;
