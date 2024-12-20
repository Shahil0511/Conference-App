const express = require("express");
const router = express.Router();
const {
  submitConferenceRequest,
  getAllRequests,
  handleRequestApproval,
} = require("../controllers/conferenceController");

// Routes for user requests
router.post("/submit", submitConferenceRequest); // User submits a request

// Routes for admin requests
router.get("/requests", getAllRequests); // Admin gets all requests
router.post("/approve-reject", handleRequestApproval); // Admin approves or rejects requests

module.exports = router;
