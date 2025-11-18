const FeedbackModel = require("../models/FeedbackSchema");
const BookingModel = require("../models/BookingSchema");
const UserModel = require("../models/UserSchema");

// --------------------- FEEDBACK CONTROLLER ---------------------
const FeedbackController = {

  // GET ALL FEEDBACKS
  getAllFeedbacks: async (req, res) => {
    try {
      const feedbacks = await FeedbackModel.find()
        .populate("guestId", "firstName lastName phone") // guest details
        .populate("bookingId", "roomNumber roomType checkInDate"); // booking details

      // format response
      const formatted = feedbacks.map(fb => ({
        _id: fb._id,
        guestName: fb.guestId ? `${fb.guestId.firstName} ${fb.guestId.lastName}` : "Unknown",
        phone: fb.guestId?.phone || "",
        roomNumber: fb.bookingId?.roomNumber || "N/A",
        roomType: fb.bookingId?.roomType || "N/A",
        checkInDate: fb.bookingId?.checkInDate || "",
        rating: fb.rating,
        comment: fb.comment || ""
      }));

      res.json({ status: true, feedbacks: formatted });

    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: error.message });
    }
  },

  // CREATE FEEDBACK (optional for future)
  createFeedback: async (req, res) => {
    try {
      const { guestId, bookingId, rating, comment } = req.body;

      if (!guestId || !bookingId || !rating) {
        return res.status(400).json({ status: false, message: "guestId, bookingId, and rating are required." });
      }

      const newFeedback = new FeedbackModel({ guestId, bookingId, rating, comment });
      await newFeedback.save();

      res.json({ status: true, message: "Feedback submitted successfully.", feedback: newFeedback });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: error.message });
    }
  }
};

module.exports = FeedbackController;
