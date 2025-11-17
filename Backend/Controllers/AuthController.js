const UserModel = require("../models/UserSchema");
const bcrypt = require('bcrypt');

const authController = {

  // ------------------- GUEST SELF-REGISTRATION -------------------
  registerGuest: async (req, res) => {
    try {
      const { firstName, lastName, email, password, phone, preferences } = req.body;

      // Check for existing email
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists", status: false });
      }

      // Hash password
      const hashpass = await bcrypt.hash(password, 10);

      // Create guest account
      const newUser = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashpass,
        phone,
        role: 'guest', // always guest
        preferences
      });

      res.json({
        message: "Guest account registered successfully",
        user: {
          id: newUser._id,
          email: newUser.email,
          role: newUser.role,
        },
        status: true
      });

    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  },

  // ------------------- STAFF CREATION (ADMIN/MANAGER ONLY) -------------------
  createStaff: async (req, res) => {
    try {
      const { firstName, lastName, email, password, phone, role, preferences } = req.body;

      // Allowed staff roles
      const allowedRoles = ['admin', 'manager', 'receptionist', 'housekeeping'];
      if (!allowedRoles.includes(role)) {
        return res.json({ message: "Invalid role", status: false });
      }

      // Check for existing email
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists", status: false });
      }

      // Hash password
      const hashpass = await bcrypt.hash(password, 10);

      // Create staff account
      const newUser = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashpass,
        phone,
        role,
        preferences
      });

      res.json({
        message: `Staff account (${role}) created successfully`,
        user: {
          id: newUser._id,
          email: newUser.email,
          role: newUser.role
        },
        status: true
      });

    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  },

  // ------------------- LOGIN -------------------
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const existingUser = await UserModel.findOne({ email });
      if (!existingUser) {
        return res.json({ message: "Account doesn't exist", status: false });
      }

      if (existingUser.status === 'inactive') {
        return res.json({ message: "Account is inactive. Contact admin.", status: false });
      }

      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        return res.json({ message: "Invalid credentials", status: false });
      }

      res.json({
        message: "Login successful",
        user: {
          id: existingUser._id,
          email: existingUser.email,
          role: existingUser.role,
          status: existingUser.status,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          phone: existingUser.phone
        },
        status: true
      });

    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  },
  // ------------------- UPDATE GUEST -------------------
  updateGuest: async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, phone, password } = req.body;

      const guest = await UserModel.findById(id);
      if (!guest) return res.status(404).json({ message: "Guest not found", status: false });
      if (guest.role !== 'guest') return res.status(400).json({ message: "Only guests can be updated", status: false });

      // Hash password if provided
      let updatedData = { firstName, lastName, email, phone };
      if (password) {
        const hashpass = await bcrypt.hash(password, 10);
        updatedData.password = hashpass;
      }

      const updatedGuest = await UserModel.findByIdAndUpdate(id, updatedData, { new: true });

      res.json({ message: "Guest updated successfully", user: updatedGuest, status: true });
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  },
  // ------------------- UPDATE STAFF -------------------
  updateStaff: async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, phone, password, role, status } = req.body;

      const staff = await UserModel.findById(id);
      if (!staff) return res.status(404).json({ message: "Staff not found", status: false });
      if (staff.role === "guest") return res.status(400).json({ message: "Cannot update guests here", status: false });

      const updatedData = { firstName, lastName, email, phone, role, status };
      if (password) {
        const bcrypt = require("bcrypt");
        const hashpass = await bcrypt.hash(password, 10);
        updatedData.password = hashpass;
      }

      const updatedStaff = await UserModel.findByIdAndUpdate(id, updatedData, { new: true });

      res.json({ message: "Staff updated successfully", user: updatedStaff, status: true });
    } catch (error) {
      res.status(500).json({ message: error.message, status: false });
    }
  },
  // ------------------- GET ALL GUESTS -------------------
  getAllGuests: async (req, res) => {
    try {
      const guests = await UserModel.find({ role: 'guest' }).select('-password'); // exclude password
      res.json(guests);
    } catch (error) {
      res.status(500).json({ message: error.message, status: false });
    }
  },

  // ------------------- GET ALL STAFF -------------------
  getAllStaff: async (req, res) => {
    try {
      // fetch all users except guests
      const staff = await UserModel.find({ role: { $ne: "guest" } }).select('-password');
      res.json(staff);
    } catch (error) {
      res.status(500).json({ message: error.message, status: false });
    }
  },

  // ------------------- DELETE GUEST -------------------
  deleteGuest: async (req, res) => {
    try {
      const { id } = req.params;

      const guest = await UserModel.findById(id);
      if (!guest) return res.status(404).json({ message: "Guest not found", status: false });
      if (guest.role !== 'guest') return res.status(400).json({ message: "Only guests can be deleted", status: false });

      await UserModel.findByIdAndDelete(id);

      res.json({ message: "Guest deleted successfully", status: true });
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  }
};

module.exports = authController;


