const ConferenceRequest = require("../models/Conference");

// Submit conference request
const submitConferenceRequest = async (req, res) => {
  try {
    const { topic, description, dateTime, userId } = req.body; // Make sure you pass userId from the frontend

    const newRequest = new ConferenceRequest({
      topic,
      description,
      dateTime,
      user: userId, // Save the user ID here
    });

    await newRequest.save();
    res
      .status(201)
      .json({ message: "Request submitted successfully", request: newRequest });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Get all conference requests (Admin view)
const getAllRequests = async (req, res) => {
  try {
    const requests = await ConferenceRequest.find()
      .populate("user", "name email") // Populating the user's name and email
      .exec();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error });
  }
};

// Approve or reject request (Admin)
const handleRequestApproval = async (req, res) => {
  const { requestId, status, approvedTime } = req.body;

  try {
    const request = await ConferenceRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    if (status === "approved") {
      request.approvedTime = approvedTime || new Date(); // Set current time if no approvedTime is provided
    } else {
      request.rejectedTime = new Date(); // Set rejection time
      request.approvedTime = null; // Reset approval time on rejection
    }

    await request.save();
    res.status(200).json({ message: "Request updated", request });
  } catch (error) {
    res.status(500).json({ message: "Error updating request", error });
  }
};
module.exports = {
  submitConferenceRequest,
  getAllRequests,
  handleRequestApproval,
};
