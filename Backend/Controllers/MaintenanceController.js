const MaintenanceRequest = require('../models/CleaningRequestSchema');
const Room = require('../models/RoomSchema');

// ------------------- REPORT ISSUE -------------------
exports.reportIssue = async (req, res) => {
  try {
    const { roomId, reportedBy, issue, assignedTo } = req.body;

    const request = new MaintenanceRequest({
      roomId,
      reportedBy,
      issue,
      assignedTo
    });

    await request.save();

    // Mark room as maintenance
    const room = await Room.findById(roomId);
    if (room) {
      room.status = 'maintenance';
      await room.save();
    }

    res.status(201).json({ message: 'Maintenance request created', request });
  } catch (error) {
    res.status(500).json({ message: 'Error creating maintenance request', error: error.message });
  }
};

// ------------------- GET ALL REQUESTS -------------------
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find()
      .populate('roomId', 'roomNumber roomType status')
      .populate('reportedBy', 'firstName lastName')
      .populate('assignedTo', 'firstName lastName');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching maintenance requests', error: error.message });
  }
};

// ------------------- UPDATE REQUEST STATUS -------------------
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status, assignedTo } = req.body;

    const request = await MaintenanceRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = status || request.status;
    request.assignedTo = assignedTo || request.assignedTo;
    await request.save();

    // If resolved, mark room as available again
    if (status === 'resolved') {
      const room = await Room.findById(request.roomId);
      if (room) {
        room.status = 'available';
        await room.save();
      }
    }

    res.status(200).json({ message: 'Maintenance request updated', request });
  } catch (error) {
    res.status(500).json({ message: 'Error updating maintenance request', error: error.message });
  }
};
