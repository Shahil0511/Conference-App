import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [approvedTime, setApprovedTime] = useState("");

  // Fetch all conference requests from the backend
  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/conference/requests"
      );
      setRequests(response.data);
    } catch (err) {
      setError("Failed to fetch requests.");
    }
  };

  // Handle approval/rejection of requests
  const handleApproval = async (requestId, status) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/conference/approve-reject",
        {
          requestId,
          status,
          approvedTime: status === "approved" ? approvedTime : null,
        }
      );
      fetchRequests(); // Refresh the list of requests after approval/rejection
    } catch (err) {
      setError("Failed to update request.");
    }
  };

  useEffect(() => {
    fetchRequests(); // Fetch data when component mounts

    const intervalId = setInterval(() => {
      fetchRequests(); // Fetch requests every 10 seconds (adjust as needed)
    }, 10000); // Refresh data every 10 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-gray-50 p-6 mb-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {request.topic}
            </h2>
            <p className="text-sm text-gray-600 mt-2">{request.description}</p>
            <p className="text-gray-600 mt-2">
              Requested on: {new Date(request.dateTime).toLocaleString()}
            </p>
            <p
              className={`mt-2 text-sm font-medium ${
                request.status === "approved"
                  ? "text-green-500"
                  : request.status === "rejected"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              Status: {request.status}
            </p>

            {request.status === "pending" && (
              <div className="mt-4">
                <button
                  onClick={() => handleApproval(request._id, "approved")}
                  className="mr-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproval(request._id, "rejected")}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Reject
                </button>

                {request.status === "approved" && (
                  <div className="mt-4">
                    <label className="block text-sm text-gray-600">
                      Set Approved Time
                    </label>
                    <input
                      type="datetime-local"
                      value={approvedTime}
                      onChange={(e) => setApprovedTime(e.target.value)}
                      className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
