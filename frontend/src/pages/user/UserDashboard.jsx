import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserDashboard() {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [requestStatus, setRequestStatus] = useState(null); // New state to track the status of the request
  const [requests, setRequests] = useState([]);

  // Fetch all requests periodically (for status updates)
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

  // Handle request submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic || !description || !dateTime) {
      setError("Please fill all the fields.");
      return;
    }

    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/conference/submit",
        {
          topic,
          description,
          dateTime,
        }
      );

      setSuccess("Request submitted successfully!");
      setTopic("");
      setDescription("");
      setDateTime("");

      // Optionally, you can fetch the requests again to show the newly created request
      fetchRequests();
    } catch (err) {
      setError("Failed to submit request.");
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
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">
          User Dashboard
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Topic */}
          <div className="mb-4">
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-600"
            >
              Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your topic"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Describe your topic"
            />
          </div>

          {/* Date and Time */}
          <div className="mb-4">
            <label
              htmlFor="dateTime"
              className="block text-sm font-medium text-gray-600"
            >
              Date and Time
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none"
          >
            Submit Request
          </button>
        </form>

        {/* Error and Success Messages */}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {success && (
          <p className="mt-4 text-green-500 text-center">{success}</p>
        )}

        {/* Display submitted requests and their statuses */}
        {requests && requests.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Submitted Requests
            </h2>
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-gray-50 p-4 mb-4 rounded-lg shadow-md"
              >
                <h3 className="font-semibold text-lg text-gray-800">
                  {request.topic}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {request.description}
                </p>
                <p className="text-sm text-gray-600 mt-2">
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
                {request.status === "approved" && (
                  <p className="mt-2 text-sm text-green-500">
                    Approved on:{" "}
                    {new Date(request.approvedTime).toLocaleString()}
                  </p>
                )}
                {request.status === "rejected" && (
                  <p className="mt-2 text-sm text-red-500">
                    Rejected on:{" "}
                    {new Date(request.rejectedTime).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
