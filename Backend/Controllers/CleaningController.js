const CleaningRequest = require("../models/CleaningRequestSchema");
const Room = require("../models/RoomSchema");
const User = require("../models/UserSchema");

// --------------------- GET ALL CLEANING REQUESTS ---------------------
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await CleaningRequest.find()
      .populate("roomId", "roomNumber")
      .populate("reportedBy", "firstName lastName email");

    res.json({ status: true, requests });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// --------------------- STAFF CREATES CLEANING REQUEST ---------------------
exports.createRequest = async (req, res) => {
  try {
    const { roomId, issue } = req.body;

    if (!roomId || !issue) {
      return res.status(400).json({ status: false, message: "Room and issue are required." });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ status: false, message: "Room not found." });
    }

    const newRequest = new CleaningRequest({
      roomId,
      reportedBy: req.user?.id || req.body.reportedBy, // fallback if no auth
      issue
    });

    await newRequest.save();

    res.json({
      status: true,
      message: "Cleaning request created successfully.",
      request: newRequest
    });
  } catch (error) {
    console.error("Error creating cleaning request:", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// --------------------- UPDATE STATUS ---------------------
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const valid = ["pending", "in-progress", "cleaned"];
    if (!valid.includes(status)) return res.status(400).json({ status: false, message: "Invalid status" });

    const updated = await CleaningRequest.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) return res.status(404).json({ status: false, message: "Request not found" });

    res.json({ status: true, message: "Status updated", request: updated });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
