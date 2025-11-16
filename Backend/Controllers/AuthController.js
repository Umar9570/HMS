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
  }
};

module.exports = authController;
