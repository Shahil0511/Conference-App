const mongoose = require("mongoose");

const conferenceRequestSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    description: { type: String, required: true },
    dateTime: { type: Date, required: true },
    status: { type: String, default: "pending" }, // 'pending', 'approved', 'rejected'
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to user collection
    approvedTime: { type: Date, default: null },
    rejectedTime: { type: Date, default: null },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("ConferenceRequest", conferenceRequestSchema);
