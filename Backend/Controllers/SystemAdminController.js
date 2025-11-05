const SystemSettingsModel = require('../models/SystemSettingsSchema');

const systemAdminController = {

  // Get current system settings
  getSettings: async (req, res) => {
    try {
      let settings = await SystemSettingsModel.findOne();
      if (!settings) {
        // If not exists, create default
        settings = await SystemSettingsModel.create({});
      }
      res.json({ status: true, settings });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  },

  // Update system settings
  updateSettings: async (req, res) => {
    try {
      const updateData = req.body; // e.g., { defaultCurrency: 'EUR', checkInTime: '15:00' }

      let settings = await SystemSettingsModel.findOne();
      if (!settings) {
        settings = await SystemSettingsModel.create(updateData);
      } else {
        settings = await SystemSettingsModel.findOneAndUpdate({}, updateData, { new: true });
      }

      res.json({ status: true, message: 'Settings updated successfully', settings });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }

};

module.exports = systemAdminController;
