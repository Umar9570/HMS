const express = require("express");
const router = express.Router();
const ComplaintController = require("../Controllers/ComplaintController");

// GET all complaints
router.get("/", ComplaintController.getAllComplaints);

// UPDATE complaint status
router.put("/:id/status", ComplaintController.updateStatus);

// POST a new complaint (optional)
router.post("/", ComplaintController.createComplaint);

module.exports = router;
