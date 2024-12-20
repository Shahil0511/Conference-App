import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginSignupHeader from "../../components/header/LoginSignupHeader";
import axios from "axios";

export default function AdminLogin() {
  const navigate = useNavigate();

  // State to track form inputs and errors
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://conference-app-backend-04hp.onrender.com/api/adminlogin",
        formData
      );

      // If login is successful, navigate to admin dashboard or homepage
      if (response.status === 200) {
        navigate("/admindashboard"); // Change the route accordingly
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div>
      <LoginSignupHeader />
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Conference MERN App ADMIN LOGIN
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Your Credentials are Safe with Us
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -m-2">
                {error && (
                  <div className="w-full text-red-500 text-center mb-4">
                    {error}
                  </div>
                )}
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="p-2 w-full">
                  <button
                    type="submit"
                    className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
              <p className="text-purple-500">Don't have an Account?</p>
              <button
                className="text-purple-500 underline hover:text-white transition duration-200 ease-in-out border py-1 px-3 border-purple-500 hover:bg-purple-500 rounded"
                onClick={() => navigate("/adminsignup")}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
