const HousekeepingTask = require('../models/HouseKeepingSchema');
const Room = require('../models/RoomSchema');

// ------------------- CREATE TASK -------------------
exports.createTask = async (req, res) => {
  try {
    const { roomId, assignedTo, taskType, description, reportedBy } = req.body;

    const task = new HousekeepingTask({
      roomId,
      assignedTo,
      taskType,
      description,
      reportedBy
    });

    await task.save();
    res.status(201).json({ message: 'Housekeeping task created', task });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

// ------------------- GET ALL TASKS -------------------
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await HousekeepingTask.find()
      .populate('roomId', 'roomNumber roomType status')
      .populate('assignedTo', 'firstName lastName')
      .populate('reportedBy', 'firstName lastName');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// ------------------- UPDATE TASK STATUS -------------------
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await HousekeepingTask.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });

    // If task is completed and it was a cleaning task, mark room as available
    if (status === 'completed' && task.taskType === 'cleaning') {
      const room = await Room.findById(task.roomId);
      if (room) {
        room.status = 'available';
        await room.save();
      }
    }

    res.status(200).json({ message: 'Task status updated', task });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};
