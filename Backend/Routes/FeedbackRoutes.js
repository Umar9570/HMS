const express = require("express");
const router = express.Router();
const FeedbackController = require("../Controllers/FeedbackController");

// GET ALL FEEDBACKS
router.get("/", FeedbackController.getAllFeedbacks);

// POST FEEDBACK
router.post("/", FeedbackController.createFeedback);

module.exports = router;
